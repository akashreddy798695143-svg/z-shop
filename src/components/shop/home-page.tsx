'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Flame, Sparkles, Zap } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { HeroSection } from './hero-section';
import { CategoryGrid } from './category-grid';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

// Countdown timer component for Deal of the Day
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[48px] text-center">
        <span className="text-xl font-bold">{pad(timeLeft.hours)}</span>
        <p className="text-[10px] text-gray-400 uppercase">hrs</p>
      </div>
      <span className="text-xl font-bold text-gray-400">:</span>
      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[48px] text-center">
        <span className="text-xl font-bold">{pad(timeLeft.minutes)}</span>
        <p className="text-[10px] text-gray-400 uppercase">min</p>
      </div>
      <span className="text-xl font-bold text-gray-400">:</span>
      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[48px] text-center">
        <span className="text-xl font-bold">{pad(timeLeft.seconds)}</span>
        <p className="text-[10px] text-gray-400 uppercase">sec</p>
      </div>
    </div>
  );
}

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useShopStore((s) => s.navigate);

  useEffect(() => {
    Promise.all([
      fetch('/api/products?featured=true').then((res) => res.json()),
      fetch('/api/products').then((res) => res.json()),
    ])
      .then(([featured, all]) => {
        setFeaturedProducts(featured);
        setAllProducts(all);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Pick a deal of the day product (one with highest discount)
  const dealProduct = allProducts.length > 0
    ? allProducts
        .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
        .sort((a, b) => {
          const discA = a.compareAtPrice! - a.price;
          const discB = b.compareAtPrice! - b.price;
          return discB - discA;
        })[0]
    : null;

  // New arrivals = last 8 products (sorted by newest)
  const newArrivals = allProducts.slice(-8).reverse();

  return (
    <div>
      <HeroSection />
      <CategoryGrid />

      {/* Deal of the Day Section */}
      {dealProduct && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <Flame className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Deal of the Day</h2>
              <p className="text-muted-foreground text-sm">Hurry up! Limited time offer</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden border shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          >
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
              {/* Product Image */}
              <div
                className="shrink-0 w-full md:w-64 h-64 rounded-xl overflow-hidden bg-gray-700 cursor-pointer"
                onClick={() => navigate('product-detail', dealProduct.id)}
              >
                {dealProduct.images[0] ? (
                  <img
                    src={dealProduct.images[0]}
                    alt={dealProduct.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Zap className="h-12 w-12 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center md:text-left">
                <Badge className="bg-red-500 text-white border-0 mb-3">
                  {Math.round(((dealProduct.compareAtPrice! - dealProduct.price) / dealProduct.compareAtPrice!) * 100)}% OFF
                </Badge>
                <h3
                  className="text-xl md:text-2xl font-bold text-white mb-2 cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => navigate('product-detail', dealProduct.id)}
                >
                  {dealProduct.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{dealProduct.description}</p>

                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <span className="text-3xl font-bold text-emerald-400">${dealProduct.price.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${dealProduct.compareAtPrice!.toFixed(2)}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                    Save ${(dealProduct.compareAtPrice! - dealProduct.price).toFixed(2)}
                  </Badge>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Ends in</span>
                  <CountdownTimer />
                </div>

                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30"
                  onClick={() => navigate('product-detail', dealProduct.id)}
                >
                  Shop This Deal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

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

      {/* New Arrivals Section - Horizontal Scroll */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">New Arrivals</h2>
                <p className="text-muted-foreground text-sm mt-1">Fresh products just landed</p>
              </div>
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

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="shrink-0 w-[260px] snap-start"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Promotional Banner */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background overlay pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />

        <div className="container relative mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                <Zap className="h-3 w-3 mr-1" />
                Limited Time Offer
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get <span className="text-emerald-400">Free Shipping</span> on Orders Over $50
              </h2>
              <p className="text-gray-400 mb-6">
                Shop our wide selection of products and enjoy free shipping on all qualifying orders. No coupon needed!
              </p>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:scale-105"
                onClick={() => navigate('shop')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
