import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const userId = searchParams.get("userId");

    if (!userId && !sessionId) {
      return NextResponse.json(
        { error: "userId or sessionId is required" },
        { status: 400 }
      );
    }

    // Order model uses userId; find orders by userId if provided
    // sessionId is accepted for API compatibility but Order model is keyed by userId
    if (!userId) {
      return NextResponse.json([]);
    }

    const orders = await db.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
