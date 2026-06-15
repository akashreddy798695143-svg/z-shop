'use client';

import { Store } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-emerald-600" />
              <span className="text-lg font-bold">
                Z <span className="text-emerald-600">Shop</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop e-commerce destination for amazing products at great prices.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>All Products</li>
              <li>Featured Items</li>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Shipping Info</li>
              <li>Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Z Shop. All rights reserved.</p>
          <p>Made with care for the best shopping experience.</p>
        </div>
      </div>
    </footer>
  );
}
