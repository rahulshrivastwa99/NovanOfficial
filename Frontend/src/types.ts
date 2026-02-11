export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'accessories';
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  stock: Record<string, number>;
  isBestSeller?: boolean;
}
