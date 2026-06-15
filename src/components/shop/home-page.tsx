'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { HeroSection } from './hero-section';
import { CategoryGrid } from './category-grid';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useShopStore((s) => s.navigate);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <HeroSection />
      <CategoryGrid />

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground text-sm mt-1">Handpicked items just for you</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('shop')}
            className="hidden sm:flex items-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Button
            variant="outline"
            onClick={() => navigate('shop')}
            className="items-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Get <span className="text-emerald-400">Free Shipping</span> on Orders Over $50
            </h2>
            <p className="text-gray-400 mb-6">
              Shop our wide selection of products and enjoy free shipping on all qualifying orders. No coupon needed!
            </p>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => navigate('shop')}
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
