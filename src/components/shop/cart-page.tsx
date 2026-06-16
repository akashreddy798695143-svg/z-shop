'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, LogIn } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export function CartPage() {
  // Use individual selectors to prevent unnecessary re-renders
  const cartItems = useShopStore((s) => s.cartItems);
  const cartTotal = useShopStore((s) => s.cartTotal);
  const cartCount = useShopStore((s) => s.cartCount);
  const sessionId = useShopStore((s) => s.sessionId);
  const updateQuantity = useShopStore((s) => s.updateQuantity);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const setCartFromServer = useShopStore((s) => s.setCartFromServer);
  const navigate = useShopStore((s) => s.navigate);
  const user = useShopStore((s) => s.user);
  const openAuthModal = useShopStore((s) => s.openAuthModal);

  // Sync cart from server on mount
  useEffect(() => {
    fetch(`/api/cart?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const serverItems = data.items.map((item: { productId: string; product: { name: string; price: number; images: string }; quantity: number }) => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images.split(',').map((u: string) => u.trim()).filter(Boolean)[0] || '',
            quantity: item.quantity,
          }));
          setCartFromServer(serverItems);
        }
      })
      .catch(() => {});
  }, [sessionId, setCartFromServer]);

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = Math.round((subtotal + tax + shipping) * 100) / 100;

  const handleUpdateQuantity = async (productId: string, newQty: number) => {
    updateQuantity(productId, newQty);
    try {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, productId, quantity: newQty }),
      });
    } catch {
      // Silent fail
    }
  };

  const handleRemoveItem = async (productId: string) => {
    removeFromCart(productId);
    try {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, productId }),
      });
    } catch {
      // Silent fail
    }
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      openAuthModal('login');
      toast({
        title: 'Please login',
        description: 'You need to login to proceed to checkout.',
        variant: 'destructive',
      });
      return;
    }
    navigate('checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Looks like you haven&apos;t added any items to your cart yet. Start shopping to find great deals!
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => navigate('shop')}
          >
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartCount} items)</h1>

      {/* Login Banner */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <LogIn className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Please login to continue</p>
              <p className="text-sm text-amber-700">Sign in to save your cart and proceed to checkout.</p>
            </div>
          </div>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            onClick={() => openAuthModal('login')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.productId}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex gap-4 p-4 bg-white rounded-xl border shadow-sm"
            >
              {/* Image */}
              <div
                className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => navigate('product-detail', item.productId)}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-sm sm:text-base cursor-pointer hover:text-emerald-600 line-clamp-2"
                  onClick={() => navigate('product-detail', item.productId)}
                >
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal > 0 && subtotal <= 50 && (
                <p className="text-xs text-emerald-600">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white h-12"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full mt-3"
              onClick={() => navigate('shop')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
