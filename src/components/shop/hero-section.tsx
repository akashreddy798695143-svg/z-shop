'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, RotateCcw, Shield, Headphones, Award, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/use-shop-store';

const heroSlides = [
  {
    id: 1,
    tag: 'Mega Sale Event',
    tagIcon: Sparkles,
    title: 'Up to 70% Off',
    highlight: 'Everything!',
    description: 'Shop the biggest sale of the season. Unbeatable prices on electronics, fashion, home goods and more.',
    cta: 'Shop the Sale',
    image: '/images/hero-sale.png',
    gradient: 'from-emerald-700 via-emerald-600 to-teal-500',
  },
  {
    id: 2,
    tag: 'New Arrivals',
    tagIcon: Sparkles,
    title: 'Discover the',
    highlight: 'Latest Trends',
    description: 'Fresh styles, cutting-edge tech, and must-have essentials — all in one place.',
    cta: 'Explore Now',
    image: '/images/hero-shopping.png',
    gradient: 'from-teal-700 via-teal-600 to-emerald-500',
  },
  {
    id: 3,
    tag: 'Free & Fast Delivery',
    tagIcon: Truck,
    title: 'Free Shipping on',
    highlight: 'Orders Over $50',
    description: 'Get your favorites delivered to your doorstep — fast, free, and hassle-free.',
    cta: 'Start Shopping',
    image: '/images/hero-delivery.png',
    gradient: 'from-emerald-800 via-emerald-600 to-teal-400',
  },
];

export function HeroSection() {
  const navigate = useShopStore((s) => s.navigate);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goNext = () => goTo((current + 1) % heroSlides.length);
  const goPrev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative bg-gradient-to-br ${slide.gradient}`}
        >
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
          </div>

          <div className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-0">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[420px] lg:min-h-[520px]">
              {/* Left: Text Content */}
              <div className="flex-1 text-center lg:text-left max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-5 border border-white/10">
                    <slide.tagIcon className="h-4 w-4 text-yellow-300" />
                    {slide.tag}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight"
                >
                  {slide.title}{' '}
                  <span className="text-yellow-300 drop-shadow-lg">{slide.highlight}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-base text-emerald-50/90 sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
                >
                  <Button
                    size="lg"
                    onClick={() => navigate('shop')}
                    className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-8 h-12 text-base shadow-xl shadow-emerald-900/20 transition-all duration-200 hover:scale-105 active:scale-100"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Right: Hero Image */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  {/* Glow behind image */}
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl scale-95" />
                  <img
                    src={slide.image}
                    alt={slide.tag}
                    className="relative w-full h-auto rounded-2xl shadow-2xl shadow-black/20 object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Slide Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hidden sm:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hidden sm:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
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
