'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Button } from '@/components/ui/button';

export function CheckoutSuccess() {
  const { lastOrderId, navigate } = useShopStore();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center justify-center text-center max-w-lg mx-auto"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center"
            >
              <CheckCircle className="h-14 w-14 text-emerald-600" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold mb-3"
        >
          Your order has been placed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground mb-6"
        >
          Thank you for your purchase. We&apos;ll send you a confirmation email with your order details.
        </motion.p>

        {lastOrderId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-lg px-6 py-3 mb-8"
          >
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono font-semibold text-sm">{lastOrderId}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('orders')}
            className="gap-2"
          >
            <Package className="h-5 w-5" />
            View Orders
          </Button>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            onClick={() => navigate('shop')}
          >
            Continue Shopping
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
