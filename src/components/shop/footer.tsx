'use client';

import { useState } from 'react';
import { Store, Mail, Phone, MapPin, ChevronDown, ChevronRight, ArrowRight, Truck, RotateCcw, ShieldCheck, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/use-shop-store';

interface FooterModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function FooterModal({ open, onClose, title, children }: FooterModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const navigate = useShopStore((s) => s.navigate);
  const [modal, setModal] = useState<string | null>(null);

  const openModal = (name: string) => setModal(name);
  const closeModal = () => setModal(null);

  const footerLinks = {
    shop: [
      { label: 'All Products', action: () => navigate('shop') },
      { label: 'Featured Items', action: () => navigate('shop') },
      { label: 'New Arrivals', action: () => navigate('shop') },
      { label: 'Best Sellers', action: () => navigate('shop') },
    ],
    help: [
      { label: 'Help Centre', action: () => openModal('help') },
      { label: 'Shipping Info', action: () => openModal('shipping') },
      { label: 'Returns & Refunds', action: () => openModal('returns') },
      { label: 'Contact Us', action: () => openModal('help') },
    ],
    company: [
      { label: 'About Us', action: () => openModal('about') },
      { label: 'Careers', action: () => openModal('careers') },
      { label: 'Privacy Policy', action: () => openModal('privacy') },
      { label: 'Terms of Service', action: () => openModal('terms') },
    ],
  };

  return (
    <footer className="mt-auto border-t bg-gray-900 text-gray-300">
      {/* Top Banner */}
      <div className="bg-emerald-600">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm sm:text-base">
            🎉 Sign up today and get <span className="text-yellow-300 font-bold">20% OFF</span> your first order!
          </p>
          <Button
            size="sm"
            onClick={() => navigate('shop')}
            className="bg-white text-emerald-700 hover:bg-gray-100 font-bold h-9 px-5 text-sm"
          >
            Shop Now <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-emerald-400" />
              <span className="text-xl font-bold text-white">
                Z <span className="text-emerald-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your one-stop e-commerce destination for amazing products at great prices. Shop with confidence — secure payments, fast delivery, and easy returns.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:akashreddy798695143@gmail.com" className="hover:text-emerald-400 transition-colors">
                  akashreddy798695143@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:+918790401013" className="hover:text-emerald-400 transition-colors">
                  +91 8790401013
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Centre */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Help Centre</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; 2025 Z Shop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button onClick={() => openModal('privacy')} className="hover:text-emerald-400 transition-colors">Privacy</button>
            <span>·</span>
            <button onClick={() => openModal('terms')} className="hover:text-emerald-400 transition-colors">Terms</button>
            <span>·</span>
            <button onClick={() => openModal('shipping')} className="hover:text-emerald-400 transition-colors">Shipping</button>
            <span>·</span>
            <button onClick={() => openModal('returns')} className="hover:text-emerald-400 transition-colors">Returns</button>
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────── */}

      {/* About Us */}
      <FooterModal open={modal === 'about'} onClose={closeModal} title="About Us">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Z Shop</span>
          </div>
          <p>
            <strong>Z Shop</strong> is your one-stop e-commerce destination, committed to bringing you the best products at unbeatable prices. From cutting-edge electronics to the latest fashion trends, home essentials, and more — we&apos;ve got everything you need.
          </p>
          <p>
            Founded with a passion for making online shopping simple, affordable, and enjoyable, we serve millions of happy customers across the country. Our mission is to deliver quality products with exceptional service, every single time.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">50+</p>
              <p className="text-xs text-gray-500">Products</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">6</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">24/7</p>
              <p className="text-xs text-gray-500">Support</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">Free</p>
              <p className="text-xs text-gray-500">Shipping*</p>
            </div>
          </div>
        </div>
      </FooterModal>

      {/* Careers */}
      <FooterModal open={modal === 'careers'} onClose={closeModal} title="Careers at Z Shop">
        <div className="space-y-4">
          <p>
            Join the <strong>Z Shop</strong> team and help us shape the future of online shopping! We&apos;re always looking for passionate, talented individuals who want to make a difference.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">🚀 Software Engineer</h4>
              <p className="text-xs text-gray-500 mt-1">Full-time · Remote</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">🎨 UI/UX Designer</h4>
              <p className="text-xs text-gray-500 mt-1">Full-time · Hybrid</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">📦 Supply Chain Manager</h4>
              <p className="text-xs text-gray-500 mt-1">Full-time · On-site</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">📣 Marketing Specialist</h4>
              <p className="text-xs text-gray-500 mt-1">Full-time · Remote</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            Interested? Send your resume to <a href="mailto:akashreddy798695143@gmail.com" className="text-emerald-600 font-medium hover:underline">akashreddy798695143@gmail.com</a>
          </p>
        </div>
      </FooterModal>

      {/* Privacy Policy */}
      <FooterModal open={modal === 'privacy'} onClose={closeModal} title="Privacy Policy">
        <div className="space-y-3">
          <p><strong>Last updated:</strong> January 2025</p>
          <p>At <strong>Z Shop</strong>, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
          <h4 className="font-semibold text-gray-900 mt-4">Information We Collect</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal details (name, email, phone) when you create an account</li>
            <li>Shipping address and payment information for order processing</li>
            <li>Browsing behavior and preferences to improve your experience</li>
          </ul>
          <h4 className="font-semibold text-gray-900 mt-4">How We Use Your Data</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Send order updates and promotional offers (with consent)</li>
            <li>Improve our website and personalize your shopping experience</li>
          </ul>
          <h4 className="font-semibold text-gray-900 mt-4">Data Protection</h4>
          <p>We use industry-standard encryption (SSL) to protect your data. We never sell your personal information to third parties.</p>
          <p className="text-gray-400 text-xs mt-4">For privacy inquiries, contact us at <a href="mailto:akashreddy798695143@gmail.com" className="text-emerald-600 hover:underline">akashreddy798695143@gmail.com</a></p>
        </div>
      </FooterModal>

      {/* Terms of Service */}
      <FooterModal open={modal === 'terms'} onClose={closeModal} title="Terms of Service">
        <div className="space-y-3">
          <p><strong>Last updated:</strong> January 2025</p>
          <p>By using <strong>Z Shop</strong>, you agree to the following terms and conditions.</p>
          <h4 className="font-semibold text-gray-900 mt-4">1. Account Responsibility</h4>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
          <h4 className="font-semibold text-gray-900 mt-4">2. Orders & Pricing</h4>
          <p>All prices are listed in USD. We reserve the right to change prices without notice. Orders are subject to availability and confirmation.</p>
          <h4 className="font-semibold text-gray-900 mt-4">3. Intellectual Property</h4>
          <p>All content on Z Shop, including logos, text, and images, is our intellectual property and may not be reproduced without permission.</p>
          <h4 className="font-semibold text-gray-900 mt-4">4. Limitation of Liability</h4>
          <p>Z Shop is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          <p className="text-gray-400 text-xs mt-4">Questions? Contact us at <a href="mailto:akashreddy798695143@gmail.com" className="text-emerald-600 hover:underline">akashreddy798695143@gmail.com</a></p>
        </div>
      </FooterModal>

      {/* Help Centre */}
      <FooterModal open={modal === 'help'} onClose={closeModal} title="Help Centre">
        <div className="space-y-4">
          <p>Need help? We&apos;re here for you! Reach out through any of the channels below.</p>

          <div className="space-y-3">
            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email Support</h4>
                <a href="mailto:akashreddy798695143@gmail.com" className="text-emerald-600 hover:underline text-sm">
                  akashreddy798695143@gmail.com
                </a>
                <p className="text-xs text-gray-500 mt-0.5">We typically respond within 24 hours</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Phone Support</h4>
                <a href="tel:+918790401013" className="text-emerald-600 hover:underline text-sm">
                  +91 8790401013
                </a>
                <p className="text-xs text-gray-500 mt-0.5">Available Mon–Sat, 9 AM – 8 PM IST</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Business Hours</h4>
                <p className="text-sm text-gray-600">Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                <p className="text-sm text-gray-600">Sunday: 10:00 AM – 6:00 PM IST</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-xs">
            <strong>💡 Quick Tip:</strong> For faster assistance, include your order number in your message.
          </div>
        </div>
      </FooterModal>

      {/* Shipping Info */}
      <FooterModal open={modal === 'shipping'} onClose={closeModal} title="Shipping Information">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <Truck className="h-5 w-5" />
            Fast & Reliable Delivery
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">🆓 Free Standard Shipping</h4>
              <p className="text-xs text-gray-600 mt-1">Available on all orders over <strong>$50</strong>. Delivery in 5–7 business days.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">⚡ Express Shipping</h4>
              <p className="text-xs text-gray-600 mt-1">Get your order in 2–3 business days. Flat rate of <strong>$9.99</strong>.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">🚀 Next-Day Delivery</h4>
              <p className="text-xs text-gray-600 mt-1">Order before 2 PM IST for next-day delivery. <strong>$14.99</strong> flat rate. Available in select cities.</p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mt-2">Processing Time</h4>
          <p>Orders are processed within 1–2 business days. You&apos;ll receive a tracking number via email once your order ships.</p>

          <h4 className="font-semibold text-gray-900 mt-2">International Shipping</h4>
          <p>Currently, we ship within India only. International shipping coming soon!</p>
        </div>
      </FooterModal>

      {/* Returns */}
      <FooterModal open={modal === 'returns'} onClose={closeModal} title="Returns & Refunds">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <RotateCcw className="h-5 w-5" />
            Easy 30-Day Returns
          </div>

          <p>We want you to be 100% satisfied with your purchase. If you&apos;re not happy, you can return most items within 30 days of delivery.</p>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">✅ Eligible for Return</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 mt-2 space-y-1">
                <li>Items in original condition with tags attached</li>
                <li>Unworn, unwashed, or unused products</li>
                <li>Items returned within 30 days of delivery</li>
                <li>Products with manufacturing defects</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">❌ Not Eligible for Return</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 mt-2 space-y-1">
                <li>Used or damaged items (not due to manufacturing defect)</li>
                <li>Items returned after 30 days</li>
                <li>Perishable goods or personal care items</li>
              </ul>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mt-2">Refund Process</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Refunds are processed within 5–7 business days after we receive the returned item</li>
            <li>Refunds will be credited to your original payment method</li>
            <li>Shipping charges are non-refundable unless the item was defective</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-2">How to Return</h4>
          <ol className="list-decimal pl-5 space-y-1 text-xs">
            <li>Contact us at <a href="mailto:akashreddy798695143@gmail.com" className="text-emerald-600 hover:underline">akashreddy798695143@gmail.com</a> or call <a href="tel:+918790401013" className="text-emerald-600 hover:underline">+91 8790401013</a></li>
            <li>Pack the item securely in its original packaging</li>
            <li>Drop off at the nearest courier location or schedule a pickup</li>
            <li>Receive your refund once the item is inspected</li>
          </ol>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs">
            <ShieldCheck className="h-4 w-4 inline mr-1" />
            <strong>Buyer Protection:</strong> If your item arrives damaged or doesn&apos;t match the description, we&apos;ll cover return shipping costs.
          </div>
        </div>
      </FooterModal>
    </footer>
  );
}
