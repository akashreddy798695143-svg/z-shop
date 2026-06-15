'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Store } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

export function Header() {
  const [localSearch, setLocalSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    navigate,
    goHome,
    setSearchQuery,
    setSelectedCategory,
    cartCount,
  } = useShopStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('shop');
  };

  const handleNavClick = (view: 'home' | 'shop' | 'orders') => {
    setMobileMenuOpen(false);
    if (view === 'home') {
      goHome();
      setLocalSearch('');
    } else if (view === 'shop') {
      setLocalSearch('');
      setSearchQuery('');
      setSelectedCategory(null);
      navigate('shop');
    } else {
      navigate(view);
    }
  };

  const navItems = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const },
    { label: 'Orders', view: 'orders' as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
        <button
          onClick={() => { goHome(); setLocalSearch(''); }}
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
        >
          <Store className="h-7 w-7 text-emerald-600" />
          <span className="text-xl font-bold tracking-tight">
            Z <span className="text-emerald-600">Shop</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navItems.map((item) => (
            <Button
              key={item.view}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item.view)}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-300 focus:ring-emerald-200"
            />
          </div>
        </form>

        {/* Cart Button */}
        <button
          onClick={() => navigate('cart')}
          aria-label={`Shopping cart with ${cartCount} items`}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-600 text-white border-0 p-0 flex items-center justify-center text-[10px] font-bold">
              {cartCount > 99 ? '99+' : cartCount}
            </Badge>
          )}
        </button>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetTitle className="flex items-center gap-2 mb-6">
              <Store className="h-6 w-6 text-emerald-600" />
              <span className="text-lg font-bold">Z Shop</span>
            </SheetTitle>
            {/* Mobile Search */}
            <form
              onSubmit={(e) => {
                handleSearch(e);
                setMobileMenuOpen(false);
              }}
              className="mb-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant="ghost"
                  onClick={() => handleNavClick(item.view)}
                  className="justify-start text-base font-medium"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
