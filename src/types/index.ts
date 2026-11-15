export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
  images?: string[];
  secondaryImage?: string;
  category: string;
  badge?: "New" | "Bestseller" | "Popular" | "Sale";
  tags?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CategoryCircle {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CollectionBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  image: string;
  bgClass: string;
}

export interface OccasionItem {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface BrandItem {
  id: string;
  name: string;
  svgType: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
