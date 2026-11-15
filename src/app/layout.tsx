import type { Metadata } from "next";
import "@/styles/globals.css";
import { TopHeader } from "@/components/layout/TopHeader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "Velorá — Premium Fashion & Lifestyle Collection",
  description: "Explore the Autumn/Winter 26 New Arrival Fashion Collection at Velorá. Premium apparel, footwear, watches, and accessories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white antialiased text-slate-900 selection:bg-[#701a28] selection:text-white">
        <CartProvider>
          <WishlistProvider>
            {/* Top utility & announcement bar */}
            <TopHeader />

            {/* Main brand navigation */}
            <Navbar />

            {/* 10px Left and Right space wrapper as explicitly instructed */}
            <main className="flex-1 w-full px-[10px]">
              {children}
            </main>

            {/* Global interactive cart slide-over drawer */}
            <CartDrawer />

            {/* Velora global footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

