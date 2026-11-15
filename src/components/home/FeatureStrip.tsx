import React from "react";
import { Truck, RotateCcw, ShieldCheck, Award } from "lucide-react";

export const FeatureStrip: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders above ₹999",
    },
    {
      icon: RotateCcw,
      title: "Easy 14-Day Returns",
      desc: "Hassle-free doorstep pickup",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      desc: "256-bit encrypted payments",
    },
    {
      icon: Award,
      title: "Authentic Quality",
      desc: "Genuine products, trusted brands",
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto py-5 sm:py-7 my-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 px-4 sm:px-8 bg-slate-50/70 border border-slate-100 rounded-2xl">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

