import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");

    const where: Prisma.ProductWhereInput = {};

    // Filter by category slug
    if (category) {
      where.category = { slug: category };
    }

    // Filter by featured
    if (featured === "true") {
      where.featured = true;
    }

    // Search in name and description
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Determine sort order
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "featured":
        orderBy = { featured: "desc" };
        break;
    }

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    // Parse images string into array
    const formattedProducts = products.map((product) => ({
      ...product,
      images: product.images
        .split(",")
        .map((url: string) => url.trim())
        .filter(Boolean),
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
