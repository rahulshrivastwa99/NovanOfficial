const products = [
  {
    name: "Essential Crew Tee",
    price: 599,
    description: "A foundational piece crafted from premium Pima cotton. Features a relaxed fit with reinforced collar for lasting shape.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#808080" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    ],
    stock: { S: 15, M: 20, L: 18, XL: 10 },
    isBestSeller: true,
  },
  {
    name: "Oversized Wool Coat",
    price: 5999,
    description: "Luxuriously soft double-faced wool blend. Dropped shoulders with a clean, architectural silhouette.",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
    ],
    stock: { XS: 5, S: 8, M: 12, L: 6 },
    isBestSeller: true,
  },
  {
    name: "Minimal Hoodie",
    price: 1999,
    description: "Heavyweight French terry with a brushed interior. Kangaroo pocket and adjustable drawcord hood. Built to last season after season.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Heather Gray", hex: "#B0B0B0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      "https://images.unsplash.com/photo-1578768079470-0a4536cc669e?w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
      "https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=800",
    ],
    stock: { S: 20, M: 25, L: 22, XL: 15 },
    isBestSeller: true,
  },
  {
    name: "Tailored Linen Trousers",
    price: 2499,
    description: "Italian linen blend with a high-waisted, wide-leg cut. Side pockets and invisible zip closure. Effortless sophistication.",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
    ],
    stock: { XS: 8, S: 12, M: 15, L: 7 },
  },
  {
  
    name: "Leather Crossbody Bag",
    price: 3499,
    description: "Full-grain vegetable-tanned leather with antique brass hardware. Adjustable strap and magnetic closure. Ages beautifully.",
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    ],
    stock: { "One Size": 30 },
    isBestSeller: true,
  },
  {
    name: "Cashmere Crew Sweater",
    price: 4999,
    description: "100% Grade-A Mongolian cashmere. Ribbed cuffs and hem with a regular fit. Featherweight warmth with timeless appeal.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1B1B3A" },
      { name: "Oatmeal", hex: "#D3C4A5" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      "https://images.unsplash.com/photo-1614975059251-992f11792571?w=800",
      "https://images.unsplash.com/photo-1580331451062-99ff652288d7?w=800",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800",
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a80?w=800",
    ],
    stock: { S: 6, M: 10, L: 8, XL: 4 },
    isBestSeller: true,
  },
  {
    name: "Silk Camisole",
    price: 1499,
    description: "Mulberry silk with French seam construction. Delicate adjustable straps and a cowl neckline. Day-to-night versatility.",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
    ],
    stock: { XS: 10, S: 14, M: 16, L: 8 },
  },
  {
    name: "Minimalist Watch",
    price: 2999,
    description: "Swiss movement with a sapphire crystal face. Italian leather strap with quick-release mechanism. 40mm case diameter.",
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Silver/Black", hex: "#C0C0C0" },
      { name: "Gold/Brown", hex: "#DAA520" },
    ],
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
    ],
    stock: { "One Size": 20 },
  }
  // ... Add the rest of your 8 products here in the same format
];

module.exports = products;