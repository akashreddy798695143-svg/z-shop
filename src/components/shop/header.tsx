'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Menu, Store, User, LogOut, Package } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Header() {
  const [localSearch, setLocalSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Use individual selectors to prevent unnecessary re-renders
  const navigate = useShopStore((s) => s.navigate);
  const goHome = useShopStore((s) => s.goHome);
  const setSearchQuery = useShopStore((s) => s.setSearchQuery);
  const setSelectedCategory = useShopStore((s) => s.setSelectedCategory);
  const cartCount = useShopStore((s) => s.cartCount);
  const user = useShopStore((s) => s.user);
  const openAuthModal = useShopStore((s) => s.openAuthModal);
  const logout = useShopStore((s) => s.logout);

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
    { label: 'Track Orders', view: 'orders' as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
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
              variant={item.view === 'orders' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick(item.view)}
              className={item.view === 'orders' 
                ? 'text-sm font-bold text-black border-black hover:bg-black hover:text-white transition-colors' 
                : 'text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'}
            >
              {item.view === 'orders' && <Package className="mr-1.5 h-4 w-4" />}
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

        {/* Auth Section - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9 px-3 hover:bg-emerald-50">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-bold">
                      {user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate('orders')}
                  className="cursor-pointer"
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuthModal('login')}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => openAuthModal('signup')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-8 px-4"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

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
                  variant={item.view === 'orders' ? 'outline' : 'ghost'}
                  onClick={() => handleNavClick(item.view)}
                  className={item.view === 'orders'
                    ? 'justify-start text-base font-bold text-black border-black hover:bg-black hover:text-white transition-colors'
                    : 'justify-start text-base font-medium'}
                >
                  {item.view === 'orders' && <Package className="mr-2 h-4 w-4" />}
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-bold">
                        {user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => { handleNavClick('orders'); }}
                    className="w-full justify-start text-base font-medium"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full justify-start text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => { openAuthModal('signup'); setMobileMenuOpen(false); }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
