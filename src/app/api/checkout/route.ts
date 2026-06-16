import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      userId,
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      paymentMethod = "card",
    } = body;

    if (
      !sessionId ||
      !userId ||
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !country
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get cart with items
    const cart = await db.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or not found" },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Calculate tax (8%)
    const tax = Math.round(subtotal * 0.08 * 100) / 100;

    // Calculate shipping (free over $50, else $9.99)
    const shipping = subtotal > 50 ? 0 : 9.99;

    // Calculate total
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;

    // Create order with items
    const order = await db.order.create({
      data: {
        userId,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        country,
        phone: phone || null,
        subtotal,
        tax,
        shipping,
        total,
        status: "pending",
        paymentMethod,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            productImage: item.product.images
              .split(",")
              .map((url: string) => url.trim())
              .filter(Boolean)[0] || "",
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
        tracking: {
          create: [
            {
              status: "pending",
              description: "Your order has been placed successfully",
              location: "Online",
              timestamp: new Date(),
            },
            {
              status: "confirmed",
              description: "Order confirmed by seller. Preparing your package.",
              location: "Z Shop Warehouse",
              timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000), // +2 hours
            },
          ],
        },
      },
      include: {
        items: true,
        tracking: true,
      },
    });

    // Clear the cart
    await db.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
