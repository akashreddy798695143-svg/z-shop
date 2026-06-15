'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { StarRating } from './star-rating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  category: { name: string; slug: string };
}

export function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const { selectedProductId, navigate, addToCart, sessionId } = useShopStore();

  useEffect(() => {
    if (!selectedProductId) return;
    let cancelled = false;
    fetch(`/api/products/${selectedProductId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      });
    return () => { cancelled = true; };
  }, [selectedProductId]);

  // Derive loading state from whether product data matches current selection
  const loading = !product || product.id !== selectedProductId;

  const handleAddToCart = async () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '',
      });
    }

    // Sync with server
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId: product.id,
          quantity,
        }),
      });
    } catch {
      // Silent fail
    }

    setAddedToCart(true);
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });

    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <Button onClick={() => navigate('shop')}>Back to Shop</Button>
      </div>
    );
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('shop')}
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shop
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage] || ''}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 text-sm font-bold">
                -{discountPercent}% OFF
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-emerald-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-emerald-600 font-medium uppercase tracking-wide mb-2">
              {product.category.name}
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.compareAtPrice!.toFixed(2)}
                </span>
                <Badge className="bg-red-50 text-red-600 border-0 font-semibold">
                  Save ${(product.compareAtPrice! - product.price).toFixed(2)}
                </Badge>
              </>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">In Stock</span>
                {product.stock < 10 && (
                  <span className="text-sm text-amber-600">
                    — Only {product.stock} left
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm font-medium text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
              <Truck className="h-5 w-5 text-emerald-600 mb-1" />
              <span className="text-xs font-medium">Free Shipping</span>
              <span className="text-xs text-muted-foreground">Over $50</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
              <RotateCcw className="h-5 w-5 text-emerald-600 mb-1" />
              <span className="text-xs font-medium">Easy Returns</span>
              <span className="text-xs text-muted-foreground">30 Days</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
              <Shield className="h-5 w-5 text-emerald-600 mb-1" />
              <span className="text-xs font-medium">Secure Pay</span>
              <span className="text-xs text-muted-foreground">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
