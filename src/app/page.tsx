'use client';

import { useShopStore } from '@/store/use-shop-store';
import { Header } from '@/components/shop/header';
import { Footer } from '@/components/shop/footer';
import { HomePage } from '@/components/shop/home-page';
import { ProductGrid } from '@/components/shop/product-grid';
import { ProductDetail } from '@/components/shop/product-detail';
import { CartPage } from '@/components/shop/cart-page';
import { CheckoutForm } from '@/components/shop/checkout-form';
import { CheckoutSuccess } from '@/components/shop/checkout-success';
import { OrderHistory } from '@/components/shop/order-history';
import { OrderDetail } from '@/components/shop/order-detail';
import { AuthModal } from '@/components/shop/auth-modal';

function ViewRenderer({ view }: { view: string }) {
  switch (view) {
    case 'home':
      return <HomePage />;
    case 'shop':
      return <ProductGrid />;
    case 'product-detail':
      return <ProductDetail />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutForm />;
    case 'checkout-success':
      return <CheckoutSuccess />;
    case 'orders':
      return <OrderHistory />;
    case 'order-detail':
      return <OrderDetail />;
    default:
      return <HomePage />;
  }
}

export default function Home() {
  const view = useShopStore((s) => s.view);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ViewRenderer view={view} />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}
