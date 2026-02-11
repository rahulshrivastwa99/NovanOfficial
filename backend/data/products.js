const products = [
  // --- MEN'S COLLECTION ---
  {
    name: "Urban Oversized Graphic Tee",
    price: 899,
    description: "Premium heavy-weight cotton oversized t-shirt featuring a bold street-style graphic. Dropped shoulders for a relaxed fit. The ultimate everyday essential.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    images: [
      "/images/Picsart_26-02-11_20-58-47-747.jpg.jpeg",
      "/images/Picsart_26-02-11_20-59-40-113.jpg.jpeg"
    ],
    stock: { S: 10, M: 25, L: 20, XL: 15 },
    isBestSeller: true,
  },
  {
    name: "Essential Solid Crewneck",
    price: 599,
    description: "A foundational piece crafted from premium combed cotton. Features a tailored fit with a reinforced collar for lasting shape.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Navy", hex: "#1B1B3A" }, { name: "Olive", hex: "#556B2F" }],
    images: [
      "/images/Picsart_26-02-11_21-00-13-629.jpg.jpeg",
      "/images/Picsart_26-02-11_21-00-53-663.jpg.jpeg"
    ],
    stock: { S: 15, M: 30, L: 25, XL: 10 },
  },
  {
    name: "Vintage Wash Print Shirt",
    price: 1099,
    description: "Retro-inspired faded wash t-shirt with a cracked vintage print. Super soft feel from day one.",
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#36454F" }, { name: "Maroon", hex: "#800000" }],
    images: [
      "/images/Picsart_26-02-11_21-01-36-758.jpg.jpeg",
      "/images/Picsart_26-02-11_21-02-06-132.jpg.jpeg"
    ],
    stock: { M: 12, L: 18, XL: 8 },
    isBestSeller: true,
  },
  {
    name: "Minimalist Drop-Shoulder Tee",
    price: 799,
    description: "Clean aesthetic with zero branding. Made for layering or standing out on its own. Breathable and stretchable fabric.",
    category: "men",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Beige", hex: "#F5F5DC" }, { name: "Gray", hex: "#808080" }],
    images: [
      "/images/Picsart_26-02-11_21-03-04-072.jpg.jpeg",
      "/images/Picsart_26-02-11_21-03-53-244.jpg.jpeg"
    ],
    stock: { S: 5, M: 20, L: 15 },
  },
  {
    name: "Classic Polo Shirt",
    price: 999,
    description: "Textured pique cotton polo with a classic two-button placket and ribbed cuffs. Smart casual perfected.",
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    images: [
      "/images/Picsart_26-02-11_21-04-31-577.jpg.jpeg",
      "/images/Picsart_26-02-11_21-05-12-996.jpg.jpeg"
    ],
    stock: { S: 8, M: 14, L: 22, XL: 10 },
  },
  {
    name: "Athletic Fit Gym Tee",
    price: 699,
    description: "Moisture-wicking activewear blend designed to move with you. Tapered waist to enhance your physique.",
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Steel Blue", hex: "#4682B4" }, { name: "Black", hex: "#000000" }],
    images: [
      "/images/Picsart_26-02-11_21-05-49-142.jpg.jpeg",
      "/images/Picsart_26-02-11_21-06-30-452.jpg.jpeg"
    ],
    stock: { M: 30, L: 25, XL: 12 },
  },

  // --- WOMEN'S COLLECTION ---
  {
    name: "Ribbed Crop Top",
    price: 599,
    description: "Form-fitting ribbed fabric with a slight stretch. Perfect for pairing with high-waisted denim or trousers.",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Lilac", hex: "#C8A2C8" }],
    images: [
      "/images/Picsart_26-02-11_21-07-13-207.jpg.jpeg",
      "/images/Picsart_26-02-11_21-08-14-378.jpg.jpeg"
    ],
    stock: { XS: 10, S: 20, M: 15, L: 8 },
    isBestSeller: true,
  },
  {
    name: "Relaxed Fit Boyfriend Tee",
    price: 799,
    description: "Borrowed-from-the-boys silhouette but tailored for you. 100% organic cotton for ultimate comfort.",
    category: "women",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Blush Pink", hex: "#FFB6C1" }, { name: "Black", hex: "#000000" }],
    images: [
      "/images/Picsart_26-02-11_21-09-19-262.jpg.jpeg",
      "/images/Picsart_26-02-11_21-10-46-207.jpg.jpeg"
    ],
    stock: { S: 12, M: 18, L: 10 },
  },
  {
    name: "Aesthetic Typo Print Shirt",
    price: 899,
    description: "Chic typography print on a soft, flowy fabric. Elevates any basic outfit instantly.",
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Off White", hex: "#FAF9F6" }, { name: "Sage", hex: "#9DC183" }],
    images: [
      "/images/Picsart_26-02-11_21-11-53-680.jpg.jpeg",
      "/images/Picsart_26-02-11_21-13-06-506.jpg.jpeg"
    ],
    stock: { XS: 5, S: 15, M: 20, L: 12 },
    isBestSeller: true,
  },
  {
    name: "Lounge Oversized Hoodie",
    price: 1499,
    description: "Plush fleece-lined interior. Ultimate cozy wear for chilling at home or running errands in style.",
    category: "women",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Heather Gray", hex: "#B0B0B0" }, { name: "Mocha", hex: "#A38068" }],
    images: [
      "/images/Picsart_26-02-11_21-13-45-942.jpg.jpeg",
      "/images/Picsart_26-02-11_21-14-33-575.jpg.jpeg"
    ],
    stock: { S: 8, M: 12, L: 15, XL: 5 },
  },
  {
    name: "Sleek Basic Camisole",
    price: 499,
    description: "Silky smooth finish with adjustable straps. A versatile staple for every wardrobe.",
    category: "women",
    sizes: ["XS", "S", "M"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Nude", hex: "#E3BC9A" }],
    images: [
      "/images/Picsart_26-02-11_21-16-01-905.jpg.jpeg",
      "/images/Picsart_26-02-11_21-17-02-399.jpg.jpeg"
    ],
    stock: { XS: 15, S: 25, M: 20 },
  },
  {
    name: "Signature Abstract Print Tee",
    price: 999,
    description: "Turn heads with this modern abstract design. Crafted from lightweight, breathable fabric.",
    category: "women",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Navy/White", hex: "#000080" }, { name: "Coral", hex: "#FF7F50" }],
    images: [
      "/images/Picsart_26-02-11_21-29-02-090.jpg.jpeg" 
      // Note: This product only gets 1 image because there were exactly 23 photos (11 pairs + 1 single)
    ],
    stock: { S: 10, M: 15, L: 10 },
  }
];

module.exports = products;