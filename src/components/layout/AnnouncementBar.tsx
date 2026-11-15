"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong className="font-semibold text-amber-300">New Season Drop:</strong> Complimentary worldwide shipping on all orders over $150 with code <span className="bg-white/10 px-1.5 py-0.5 rounded text-amber-200">LUXE10</span>
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

