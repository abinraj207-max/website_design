import { 
  CategoryCircle, 
  CollectionBanner, 
  Product, 
  OccasionItem, 
  BrandItem, 
  CustomerReview 
} from "@/types";

export const categoryCircles: CategoryCircle[] = [
  {
    id: "c-men",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-women",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-kids",
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-footwear",
    name: "Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-bags",
    name: "Bags",
    slug: "bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-accessories",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-watches",
    name: "Watches",
    slug: "watches",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c-jewellery",
    name: "Jewellery",
    slug: "jewellery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80",
  },
];

export const collectionBanners: CollectionBanner[] = [
  {
    id: "col-1",
    title: "Men's Collection",
    subtitle: "Modern styles for every occasion.",
    buttonText: "Shop Men",
    link: "/categories/men",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bgClass: "bg-[#f5ece4]",
  },
  {
    id: "col-2",
    title: "Women's Collection",
    subtitle: "Elegant, trendy & timeless outfits.",
    buttonText: "Shop Women",
    link: "/categories/women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    bgClass: "bg-[#faeaec]",
  },
  {
    id: "col-3",
    title: "Footwear Collection",
    subtitle: "Step into comfort and style.",
    buttonText: "Shop Now",
    link: "/categories/footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    bgClass: "bg-[#edf1f5]",
  },
];

export const trendingProducts: Product[] = [
  {
    id: "p1",
    name: "Minimalist Utility Overshirt",
    slug: "minimalist-utility-overshirt",
    description: "Relaxed fit utility jacket crafted from durable cotton twill. Features twin patch chest pockets, tortoise button front closure, and tailored sleeve cuffs.",
    price: 3499,
    originalPrice: 4999,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    category: "men",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tan Brown", hex: "#a57146" },
      { name: "Olive Green", hex: "#4b5320" },
      { name: "Navy", hex: "#1e293b" }
    ],
  },
  {
    id: "p2",
    name: "Ribbed Knit Sweater",
    slug: "ribbed-knit-sweater",
    description: "Premium cotton-cashmere blend textured knit sweater designed with chunky ribbed collar and cuffs for cold weather comfort.",
    price: 2299,
    originalPrice: 3299,
    discountPercentage: 30,
    rating: 4.7,
    reviewCount: 96,
    inStock: true,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream Oatmeal", hex: "#f5f0e6" },
      { name: "Charcoal", hex: "#374151" }
    ],
  },
  {
    id: "p3",
    name: "Classic Polo T-Shirt",
    slug: "classic-polo-t-shirt",
    description: "100% combed piqué cotton polo with ribbed spread collar and mother-of-pearl buttons. Breathable and fade-resistant fabric.",
    price: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    rating: 4.9,
    reviewCount: 180,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    category: "men",
    badge: "Bestseller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy Blue", hex: "#172554" },
      { name: "Jet Black", hex: "#0f172a" },
      { name: "Burgundy", hex: "#701a28" }
    ],
  },
  {
    id: "p4",
    name: "Floral Maxi Dress",
    slug: "floral-maxi-dress",
    description: "Flowing georgette maxi dress adorned with romantic seasonal botanicals. Sweetheart neckline with smocked back and tiered A-line skirt.",
    price: 3999,
    originalPrice: 5499,
    discountPercentage: 27,
    rating: 4.8,
    reviewCount: 120,
    inStock: true,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dusty Rose Floral", hex: "#d88a8a" },
      { name: "Sage Floral", hex: "#94a3b8" }
    ],
  },
  {
    id: "p5",
    name: "Retro Classic Sneakers",
    slug: "retro-classic-sneakers",
    description: "Iconic court-inspired low top silhouette featuring genuine tumbled leather, cushioned OrthoLite insole, and a vulcanized rubber outsole.",
    price: 5499,
    originalPrice: 6999,
    discountPercentage: 21,
    rating: 4.7,
    reviewCount: 310,
    inStock: true,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    category: "footwear",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Pristine White", hex: "#ffffff" },
      { name: "Tan Gum", hex: "#d4a373" }
    ],
  },
  {
    id: "p6",
    name: "Minimal Analog Watch",
    slug: "minimal-analog-watch",
    description: "40mm brushed stainless steel casing paired with genuine Italian calfskin leather strap. Sapphire-coated crystal with Japanese 3-hand movement.",
    price: 2999,
    originalPrice: 4499,
    discountPercentage: 33,
    rating: 4.8,
    reviewCount: 220,
    inStock: true,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    category: "accessories",
    badge: "Popular",
    colors: [
      { name: "Warm Tan Leather", hex: "#9a4e2a" },
      { name: "Midnight Black", hex: "#1e1e1e" }
    ],
  },
];

export const occasions: OccasionItem[] = [
  {
    id: "occ-casual",
    name: "Casual Wear",
    slug: "casual-wear",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "occ-office",
    name: "Office Wear",
    slug: "office-wear",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "occ-party",
    name: "Party Wear",
    slug: "party-wear",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "occ-festive",
    name: "Festive Wear",
    slug: "festive-wear",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "occ-active",
    name: "Active Wear",
    slug: "active-wear",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "occ-travel",
    name: "Travel Wear",
    slug: "travel-wear",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80",
  },
];

export const topBrands: BrandItem[] = [
  { id: "b1", name: "Levi's", svgType: "levis" },
  { id: "b2", name: "Nike", svgType: "nike" },
  { id: "b3", name: "Adidas", svgType: "adidas" },
  { id: "b4", name: "Puma", svgType: "puma" },
  { id: "b5", name: "H&M", svgType: "hm" },
  { id: "b6", name: "Zara", svgType: "zara" },
  { id: "b7", name: "Allen Solly", svgType: "allensolly" },
  { id: "b8", name: "U.S. Polo Assn.", svgType: "uspolo" },
];

export const customerReviews: CustomerReview[] = [
  {
    id: "r1",
    name: "Arun K.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Excellent quality and perfect fit. The fabric is premium!",
  },
  {
    id: "r2",
    name: "Divya S.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Love the collection! Fast delivery and great packaging.",
  },
  {
    id: "r3",
    name: "Karthik M.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Affordable and stylish. Will definitely shop again!",
  },
];

