'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, ChevronRight, ShoppingBag, LogIn } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

function OrderHistoryContent({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useShopStore((s) => s.navigate);

  useEffect(() => {
    fetch(`/api/orders?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven&apos;t placed any orders yet. Start shopping to see your orders here!
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => navigate('shop')}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border shadow-sm p-4 sm:p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('order-detail', order.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-sm">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </h3>
                  <Badge
                    className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700'} border-0 text-xs`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                  <span className="text-gray-300">|</span>
                  <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Preview items */}
                <div className="flex items-center gap-2 mt-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      {item.productImage ? (
                        <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-4 w-4 text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto mt-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function OrderHistory() {
  const { user, openAuthModal } = useShopStore();

  // Not logged in state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <LogIn className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Please login to view your orders</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Sign in to see your order history, track shipments, and manage returns.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => openAuthModal('login')}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return <OrderHistoryContent userId={user.id} />;
}
