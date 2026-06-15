import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to get cart with items and products
async function getCartWithItems(sessionId: string) {
  return db.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: {
          product: {
            include: { category: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

// GET /api/cart - Get cart by sessionId or userId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const userId = searchParams.get("userId");

    if (!sessionId && !userId) {
      return NextResponse.json(
        { error: "sessionId or userId is required" },
        { status: 400 }
      );
    }

    // Use sessionId for cart lookup if available
    // userId is accepted for API compatibility but cart is keyed by sessionId
    if (sessionId) {
      const cart = await getCartWithItems(sessionId);
      if (!cart) {
        return NextResponse.json({ items: [] });
      }
      return NextResponse.json(cart);
    }

    // If only userId is provided, return empty cart
    // (Cart model uses sessionId, not userId)
    return NextResponse.json({ items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId, quantity = 1 } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: "sessionId and productId are required" },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: { sessionId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { sessionId },
      });
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Increment quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const updatedCart = await getCartWithItems(sessionId);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId, quantity } = body;

    if (!sessionId || !productId || quantity === undefined) {
      return NextResponse.json(
        { error: "sessionId, productId, and quantity are required" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: { sessionId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (quantity === 0) {
      // Remove the item if quantity is 0
      await db.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });
    } else {
      // Update quantity
      const cartItem = await db.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      if (!cartItem) {
        return NextResponse.json(
          { error: "Cart item not found" },
          { status: 404 }
        );
      }

      await db.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity },
      });
    }

    const updatedCart = await getCartWithItems(sessionId);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: "sessionId and productId are required" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: { sessionId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    await db.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    const updatedCart = await getCartWithItems(sessionId);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
