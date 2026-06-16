'use client';

import { useEffect, useState } from 'react';
import { Package, Clock, ChevronRight, ShoppingBag, LogIn, Truck, FileText, Eye } from 'lucide-react';
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
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-indigo-100 text-indigo-700',
  shipped: 'bg-purple-100 text-purple-700',
  'out-for-delivery': 'bg-orange-100 text-orange-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusDotColors: Record<string, string> = {
  pending: 'bg-amber-500',
  confirmed: 'bg-blue-500',
  processing: 'bg-indigo-500',
  shipped: 'bg-purple-500',
  'out-for-delivery': 'bg-orange-500',
  delivered: 'bg-emerald-500',
  cancelled: 'bg-red-500',
};

// Mini progress bar for order list
const TRACKING_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered'];

function MiniOrderProgress({ status }: { status: string }) {
  const isCancelled = status === 'cancelled';
  const currentIdx = TRACKING_STEPS.indexOf(status);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className="h-1.5 flex-1 rounded-full bg-red-200">
          <div className="h-full rounded-full bg-red-500" style={{ width: '100%' }} />
        </div>
        <span className="text-[10px] font-semibold text-red-500 shrink-0">CANCELLED</span>
      </div>
    );
  }

  const progress = currentIdx >= 0 ? ((currentIdx + 1) / TRACKING_STEPS.length) * 100 : 0;

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="h-1.5 flex-1 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] font-semibold text-emerald-600 shrink-0">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

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
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-sm text-muted-foreground mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {orders.map((order) => {
          const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/-/g, ' ');
          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Top row: Order info */}
              <div
                className="p-4 sm:p-5 cursor-pointer"
                onClick={() => navigate('order-detail', order.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-sm">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <Badge
                        className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700'} border-0 text-xs`}
                      >
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${statusDotColors[order.status] || 'bg-gray-400'}`} />
                        {statusLabel}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                      <span className="text-gray-300">|</span>
                      <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                    </div>

                    {/* Mini progress bar */}
                    <MiniOrderProgress status={order.status} />

                    {/* Preview items */}
                    <div className="flex items-center gap-2 mt-3">
                      {order.items.slice(0, 4).map((item, i) => (
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
                      {order.items.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{order.items.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-auto mt-2" />
                  </div>
                </div>
              </div>

              {/* Action buttons row */}
              <div className="border-t px-4 sm:px-5 py-3 flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('order-detail', order.id);
                  }}
                >
                  <Truck className="h-3.5 w-3.5" />
                  Track Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/api/invoice/${order.id}`, '_blank');
                  }}
                >
                  <FileText className="h-3.5 w-3.5" />
                  View Invoice
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetch(`/api/invoice/${order.id}`)
                      .then((res) => res.text())
                      .then((html) => {
                        const blob = new Blob([html], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `invoice-${order.id.slice(-8).toUpperCase()}.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      });
                  }}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Download Invoice
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OrderHistory() {
  const user = useShopStore((s) => s.user);
  const openAuthModal = useShopStore((s) => s.openAuthModal);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
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
        </div>
      </div>
    );
  }

  return <OrderHistoryContent userId={user.id} />;
}
