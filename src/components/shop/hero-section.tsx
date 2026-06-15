'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, RotateCcw, Shield, Headphones, Award, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/use-shop-store';

export function HeroSection() {
  const navigate = useShopStore((s) => s.navigate);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500">
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Decorative blur circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[10%] h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hidden lg:flex items-center justify-center"
        >
          <span className="text-2xl">🛍️</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[55%] right-[8%] h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hidden lg:flex items-center justify-center"
        >
          <span className="text-xl">📱</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[25%] left-[5%] h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hidden lg:flex items-center justify-center"
        >
          <span className="text-lg">💎</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-[20%] left-[15%] h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hidden lg:flex items-center justify-center"
        >
          <span className="text-xl">🎁</span>
        </motion.div>
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-6 border border-white/10">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Discover Amazing Deals
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Welcome to{' '}
            <span className="text-yellow-300 drop-shadow-lg">Z Shop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-emerald-50 sm:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Discover amazing deals on electronics, fashion, home goods, and more.
            Shop the best products at unbeatable prices with free shipping on orders over $50.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('shop')}
              className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-8 h-13 text-base shadow-xl shadow-emerald-900/20 transition-all duration-200 hover:scale-105 active:scale-100"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-emerald-100"
          >
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-300" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-emerald-300" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-emerald-300" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-300" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-300" />
              <span>Multiple Payment</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
