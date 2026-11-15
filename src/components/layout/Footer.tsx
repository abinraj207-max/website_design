"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Mail,
  Phone
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#701a28] via-[#5d1421] to-[#480e19] text-white pt-16 pb-10 px-[10px] border-t border-[#8e2537] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Top Perks Bar (Brand Burgundy Translucent Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-white/15">
          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white tracking-wide">Free Global Shipping</h5>
              <p className="text-[11px] text-rose-100/80 font-medium">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white tracking-wide">14-Day Easy Returns</h5>
              <p className="text-[11px] text-rose-100/80 font-medium">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white tracking-wide">100% Authentic Quality</h5>
              <p className="text-[11px] text-rose-100/80 font-medium">Certified genuine designer products</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-2xl hover:bg-white/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white tracking-wide">Bespoke Concierge</h5>
              <p className="text-[11px] text-rose-100/80 font-medium">24/7 styling assistance & care</p>
            </div>
          </div>
        </div>

        {/* Main 4-Column Layout Styled in Website Brand Color */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-12 border-b border-white/15">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl font-extrabold tracking-tight text-white block">
                Velorá<span className="text-amber-300">.</span>
              </span>
            </Link>

            <p className="text-xs text-rose-100/90 leading-relaxed max-w-sm font-medium">
              Curating modern silhouettes with enduring craftsmanship, sustainable fabrics, and understated luxury. Designed to elevate your everyday lifestyle.
            </p>

            <div className="pt-2 text-xs text-rose-100/80 space-y-2 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>concierge@velora.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>1800-420-VELORA (Toll-Free 24×7)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#701a28] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#701a28] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#701a28] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#701a28] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-rose-100 font-medium">
              <li><Link href="/categories/womens-fashion" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Women's Edit</Link></li>
              <li><Link href="/categories/mens-apparel" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Men's Wardrobe</Link></li>
              <li><Link href="/categories/accessories" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Luxury Accessories</Link></li>
              <li><Link href="/categories/footwear" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Designer Footwear</Link></li>
              <li><Link href="/products?filter=new" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Autumn / Winter '26</Link></li>
              <li><Link href="/products?filter=sale" className="text-amber-300 hover:text-white font-bold hover:translate-x-1 inline-block transition-transform">Seasonal Sale (40% OFF)</Link></li>
            </ul>
          </div>

          {/* Col 3: Client Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-rose-100 font-medium">
              <li><Link href="/orders" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Track Shipment</Link></li>
              <li><Link href="/orders" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Easy Returns Portal</Link></li>
              <li><Link href="/profile" className="hover:text-white hover:translate-x-1 inline-block transition-transform">My Account</Link></li>
              <li><Link href="/wishlist" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Saved Wishlist</Link></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Size & Fit Guide</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Privilege Club (Glass Card in Brand Palette) */}
          <div className="md:col-span-4 space-y-3.5 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Velorá Privilege Club
              </h4>
            </div>

            <p className="text-xs text-rose-100 leading-relaxed font-medium">
              Subscribe for private invitations to seasonal drops, lookbooks & an instant <strong className="text-amber-300">10% off</strong> on your inaugural order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-white rounded-full p-1 shadow-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 px-3.5 py-2 outline-none font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#701a28] hover:bg-[#58121f] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Joined!</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-rose-200/80 font-medium">Zero spam. Unsubscribe at any time with one click.</p>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Payment Gateways */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/80 font-medium">
          <p>© {new Date().getFullYear()} Velorá Atelier Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>

          {/* Clean Payment Gateway Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-rose-200 mr-1 font-semibold">100% Secured:</span>
            <span className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-[#15803d] shadow-sm">UPI</span>
            <span className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-[#1d4ed8] shadow-sm">VISA</span>
            <span className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-[#dc2626] shadow-sm">Mastercard</span>
            <span className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-[#d97706] shadow-sm">RuPay</span>
            <span className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-[#0284c7] shadow-sm">Paytm</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
