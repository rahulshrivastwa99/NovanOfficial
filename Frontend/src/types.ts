export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'accessories';
  sizes: { size: string; stock: number }[];
  colors: { name: string; hex: string }[];
  images: string[];
  // stock: Record<string, number>; // Removed in favor of sizes array
  reviews: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
  }[];
  rating: number;
  numReviews: number;
  isBestSeller?: boolean;
}
