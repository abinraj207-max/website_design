"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto my-6 sm:my-8">
      <div className="rounded-2xl bg-[#701a28] text-white p-6 sm:p-8 md:p-10 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Title and Icon */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                Get Exclusive Offers & Updates
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                Subscribe to our newsletter and never miss a deal!
              </p>
            </div>
          </div>

          {/* Right Input and Submit Button */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-auto flex-1 max-w-md"
          >
            <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 px-4 py-2 outline-none rounded-full bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#701a28] hover:bg-[#57121e] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

