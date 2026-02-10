export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-1",
    customerName: "Alice Morgan",
    email: "alice@example.com",
    items: [
      { productId: "1", name: "Essential Crew Tee", price: 49, quantity: 2, size: "M", color: "Black" },
      { productId: "5", name: "Leather Crossbody Bag", price: 245, quantity: 1, size: "One Size", color: "Tan" },
    ],
    total: 343,
    status: "delivered",
    shippingAddress: { street: "123 Fashion Ave", city: "New York", state: "NY", zip: "10001", country: "US" },
    paymentMethod: "Credit Card",
    createdAt: "2026-01-15",
  },
  {
    id: "ORD-002",
    userId: "user-2",
    customerName: "James Lee",
    email: "james@example.com",
    items: [
      { productId: "3", name: "Minimal Hoodie", price: 129, quantity: 1, size: "L", color: "Black" },
    ],
    total: 129,
    status: "shipped",
    shippingAddress: { street: "456 Style St", city: "Los Angeles", state: "CA", zip: "90001", country: "US" },
    paymentMethod: "COD",
    createdAt: "2026-01-28",
  },
  {
    id: "ORD-003",
    userId: "user-1",
    customerName: "Alice Morgan",
    email: "alice@example.com",
    items: [
      { productId: "2", name: "Oversized Wool Coat", price: 389, quantity: 1, size: "S", color: "Charcoal" },
    ],
    total: 389,
    status: "processing",
    shippingAddress: { street: "123 Fashion Ave", city: "New York", state: "NY", zip: "10001", country: "US" },
    paymentMethod: "Credit Card",
    createdAt: "2026-02-03",
  },
  {
    id: "ORD-004",
    userId: "user-3",
    customerName: "Sophia Chen",
    email: "sophia@example.com",
    items: [
      { productId: "6", name: "Cashmere Crew Sweater", price: 279, quantity: 1, size: "M", color: "Oatmeal" },
      { productId: "8", name: "Minimalist Watch", price: 195, quantity: 1, size: "One Size", color: "Silver/Black" },
    ],
    total: 474,
    status: "processing",
    shippingAddress: { street: "789 Luxury Ln", city: "Chicago", state: "IL", zip: "60601", country: "US" },
    paymentMethod: "Credit Card",
    createdAt: "2026-02-07",
  },
  {
    id: "ORD-005",
    userId: "user-4",
    customerName: "Daniel Park",
    email: "daniel@example.com",
    items: [
      { productId: "7", name: "Silk Camisole", price: 119, quantity: 2, size: "S", color: "Champagne" },
    ],
    total: 238,
    status: "shipped",
    shippingAddress: { street: "321 Couture Blvd", city: "Miami", state: "FL", zip: "33101", country: "US" },
    paymentMethod: "Credit Card",
    createdAt: "2026-02-05",
  },
];
