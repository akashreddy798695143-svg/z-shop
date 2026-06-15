'use client';

import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useShopStore } from '@/store/use-shop-store';
import { StarRating } from './star-rating';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  category: { name: string; slug: string };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate, addToCart, sessionId, user, openAuthModal } = useShopStore();
  const image = product.images[0] || '';
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleCardClick = () => {
    navigate('product-detail', product.id);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      openAuthModal('login');
      toast({
        title: 'Please login',
        description: 'Please login to add items to cart.',
        variant: 'destructive',
      });
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image,
    });

    // Sync with server
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId: product.id,
          quantity: 1,
        }),
      });
    } catch {
      // Silent fail for server sync - local cart is still updated
    }

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden py-0 gap-0 transition-all duration-300 hover:shadow-lg border border-gray-200 relative"
      onClick={handleCardClick}
    >
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <ShoppingCart className="h-8 w-8 text-gray-300" />
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs font-bold">
            -{discountPercent}%
          </Badge>
        )}

        {/* Featured Badge */}
        {product.featured && !hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-emerald-600 text-white border-0 text-xs">
            Featured
          </Badge>
        )}

        {/* Quick Add Button - always visible on mobile, hover on sm+ */}
        <div className="absolute bottom-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            className="h-9 w-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category.name}
        </div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size={13} />
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-amber-600 font-medium">Only {product.stock} left in stock</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 font-medium">Out of stock</p>
        )}
      </CardContent>
    </Card>
  );
}
