'use client';

import { useState } from 'react';
import { Loader2, Mail, Lock, User, Eye, EyeOff, Store, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useShopStore } from '@/store/use-shop-store';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface FormErrors {
  [key: string]: string;
}

export function AuthModal() {
  const { isAuthModalOpen, authModalTab, closeAuthModal, setUser, openAuthModal } = useShopStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (field: string, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateLogin = (): boolean => {
    const newErrors: FormErrors = {};
    if (!loginForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = (): boolean => {
    const newErrors: FormErrors = {};
    if (!signupForm.name.trim()) newErrors.name = 'Name is required';
    if (!signupForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!signupForm.password || signupForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.error || 'Login failed' });
        return;
      }

      setUser({ id: data.id, name: data.name, email: data.email });
      closeAuthModal();
      setLoginForm({ email: '', password: '' });
      setErrors({});
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${data.name}`,
      });
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.error || 'Registration failed' });
        return;
      }

      setUser({ id: data.id, name: data.name, email: data.email });
      closeAuthModal();
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      toast({
        title: 'Account created!',
        description: `Welcome to Z Shop, ${data.name}!`,
      });
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => { if (!open) closeAuthModal(); }}>
      <DialogContent
        className="sm:max-w-[900px] p-0 gap-0 overflow-hidden rounded-2xl border-0 shadow-2xl"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Sign in or create an account</DialogDescription>

        <div className="flex flex-col sm:flex-row min-h-[560px]">
          {/* Left Panel - Gradient Branding (hidden on mobile) */}
          <div className="hidden sm:flex sm:w-[380px] shrink-0 flex-col justify-between bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-300/20 blur-2xl" />
            <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-emerald-400/20 blur-xl" />

            {/* Top Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <Store className="h-8 w-8" />
                <span className="text-2xl font-bold">Z Shop</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight mb-3">
                Discover the best deals, just for you
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Join millions of happy shoppers. Get exclusive deals, fast shipping, and easy returns.
              </p>
            </div>

            {/* Benefits */}
            <div className="relative z-10 space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-emerald-100 text-xs">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-emerald-100 text-xs">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure Payments</p>
                  <p className="text-emerald-100 text-xs">SSL encrypted checkout</p>
                </div>
              </div>
            </div>

            {/* Demo hint */}
            <div className="relative z-10 mt-6 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-emerald-100">
                <span className="font-semibold text-white">Demo account:</span> demo@zshop.com / demo123
              </p>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 p-6 sm:p-8 bg-white">
            {/* Mobile gradient header */}
            <div className="sm:hidden bg-gradient-to-r from-emerald-600 to-teal-400 -mx-6 -mt-6 px-6 py-5 mb-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
              <div className="relative z-10 flex items-center gap-2">
                <Store className="h-6 w-6" />
                <span className="text-xl font-bold">Z Shop</span>
              </div>
              <p className="relative z-10 text-emerald-100 text-sm mt-1">
                Discover the best deals, just for you
              </p>
            </div>

            <Tabs
              value={authModalTab}
              onValueChange={(val) => openAuthModal(val as 'login' | 'signup')}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
                <TabsTrigger value="login" className="text-sm font-semibold">Login</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm font-semibold">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {errors.form && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginForm.email}
                        onChange={(e) => handleLoginChange('email', e.target.value)}
                        className={`pl-10 h-11 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => handleLoginChange('password', e.target.value)}
                        className={`pl-10 pr-10 h-11 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>

                  {/* Demo hint for mobile */}
                  <div className="sm:hidden p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                    <p className="text-xs text-emerald-700">
                      <span className="font-semibold">Demo:</span> demo@zshop.com / demo123
                    </p>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    New to Z Shop?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup')}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      Create an account
                    </button>
                  </p>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  {errors.form && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupForm.name}
                        onChange={(e) => handleSignupChange('name', e.target.value)}
                        className={`pl-10 h-11 ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupForm.email}
                        onChange={(e) => handleSignupChange('email', e.target.value)}
                        className={`pl-10 h-11 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={signupForm.password}
                        onChange={(e) => handleSignupChange('password', e.target.value)}
                        className={`pl-10 pr-10 h-11 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                        className={`pl-10 h-11 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
