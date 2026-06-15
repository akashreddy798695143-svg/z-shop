'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Package, Phone, Mail } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string | null;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const { selectedOrderId, navigate } = useShopStore();

  useEffect(() => {
    if (!selectedOrderId) return;
    let cancelled = false;
    fetch(`/api/orders/${selectedOrderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch(() => {
        if (!cancelled) setOrder(null);
      });
    return () => { cancelled = true; };
  }, [selectedOrderId]);

  // Derive loading state from whether order data matches current selection
  const loading = !order || order.id !== selectedOrderId;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-60 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Order not found</h2>
        <Button onClick={() => navigate('orders')}>Back to Orders</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <Button
        variant="ghost"
        onClick={() => navigate('orders')}
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </Button>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground">
            Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
          </p>
        </div>
        <Badge className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700'} border-0 text-sm px-3 py-1 w-fit`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    {item.productImage ? (
                      <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-6 w-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">${(item.price * item.quantity).toFixed(2)} total</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Shipping Address
            </h2>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p className="font-medium text-foreground">{order.firstName} {order.lastName}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.state} {order.zipCode}</p>
              <p>{order.country}</p>
            </div>
            {order.phone && (
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                {order.phone}
              </div>
            )}
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {order.email}
            </div>
          </div>

          {/* Order Totals */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3">Order Total</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Payment: {order.paymentMethod === 'card' ? 'Credit Card' : order.paymentMethod === 'debit' ? 'Debit Card' : 'UPI'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
