const products = [
  // --- MEN'S COLLECTION ---
  {
    name: "Urban Oversized Graphic Tee",
    price: 899,
    description: "Premium heavy-weight cotton oversized t-shirt featuring a bold street-style graphic. Dropped shoulders for a relaxed fit. The ultimate everyday essential.",
    category: "men",
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 25 }, { size: "L", stock: 20 }, { size: "XL", stock: 15 }],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    images: [
      "/images/Picsart_26-02-11_20-58-47-747.jpg",
      "/images/Picsart_26-02-11_20-59-40-113.jpg"
    ],
    isBestSeller: true,
  },
  {
    name: "Essential Solid Crewneck",
    price: 599,
    description: "A foundational piece crafted from premium combed cotton. Features a tailored fit with a reinforced collar for lasting shape.",
    category: "men",
    sizes: [{ size: "S", stock: 15 }, { size: "M", stock: 30 }, { size: "L", stock: 25 }, { size: "XL", stock: 10 }],
    colors: [{ name: "Navy", hex: "#1B1B3A" }, { name: "Olive", hex: "#556B2F" }],
    images: [
      "/images/Picsart_26-02-11_21-00-13-629.jpg",
      "/images/Picsart_26-02-11_21-00-53-663.jpg"
    ],
  },
  {
    name: "Vintage Wash Print Shirt",
    price: 1099,
    description: "Retro-inspired faded wash t-shirt with a cracked vintage print. Super soft feel from day one.",
    category: "men",
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 18 }, { size: "XL", stock: 8 }],
    colors: [{ name: "Charcoal", hex: "#36454F" }, { name: "Maroon", hex: "#800000" }],
    images: [
      "/images/Picsart_26-02-11_21-01-36-758.jpg",
      "/images/Picsart_26-02-11_21-02-06-132.jpg"
    ],
    isBestSeller: true,
  },
  {
    name: "Minimalist Drop-Shoulder Tee",
    price: 799,
    description: "Clean aesthetic with zero branding. Made for layering or standing out on its own. Breathable and stretchable fabric.",
    category: "men",
    sizes: [{ size: "S", stock: 5 }, { size: "M", stock: 20 }, { size: "L", stock: 15 }],
    colors: [{ name: "Beige", hex: "#F5F5DC" }, { name: "Gray", hex: "#808080" }],
    images: [
      "/images/Picsart_26-02-11_21-03-04-072.jpg",
      "/images/Picsart_26-02-11_21-03-53-244.jpg"
    ],
  },
  {
    name: "Classic Polo Shirt",
    price: 999,
    description: "Textured pique cotton polo with a classic two-button placket and ribbed cuffs. Smart casual perfected.",
    category: "men",
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 14 }, { size: "L", stock: 22 }, { size: "XL", stock: 10 }],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    images: [
      "/images/Picsart_26-02-11_21-04-31-577.jpg",
      "/images/Picsart_26-02-11_21-05-12-996.jpg"
    ],
  },
  {
    name: "Athletic Fit Gym Tee",
    price: 699,
    description: "Moisture-wicking activewear blend designed to move with you. Tapered waist to enhance your physique.",
    category: "men",
    sizes: [{ size: "M", stock: 30 }, { size: "L", stock: 25 }, { size: "XL", stock: 12 }],
    colors: [{ name: "Steel Blue", hex: "#4682B4" }, { name: "Black", hex: "#000000" }],
    images: [
      "/images/Picsart_26-02-11_21-05-49-142.jpg",
      "/images/Picsart_26-02-11_21-06-30-452.jpg"
    ],
  },

  // --- WOMEN'S COLLECTION ---
  {
    name: "Ribbed Crop Top",
    price: 599,
    description: "Form-fitting ribbed fabric with a slight stretch. Perfect for pairing with high-waisted denim or trousers.",
    category: "women",
    sizes: [{ size: "XS", stock: 10 }, { size: "S", stock: 20 }, { size: "M", stock: 15 }, { size: "L", stock: 8 }],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Lilac", hex: "#C8A2C8" }],
    images: [
      "/images/Picsart_26-02-11_21-07-13-207.jpg",
      "/images/Picsart_26-02-11_21-08-14-378.jpg"
    ],
    isBestSeller: true,
  },
  {
    name: "Relaxed Fit Boyfriend Tee",
    price: 799,
    description: "Borrowed-from-the-boys silhouette but tailored for you. 100% organic cotton for ultimate comfort.",
    category: "women",
    sizes: [{ size: "S", stock: 12 }, { size: "M", stock: 18 }, { size: "L", stock: 10 }],
    colors: [{ name: "Blush Pink", hex: "#FFB6C1" }, { name: "Black", hex: "#000000" }],
    images: [
      "/images/Picsart_26-02-11_21-09-19-262.jpg",
      "/images/Picsart_26-02-11_21-10-46-207.jpg"
    ],
  },
  {
    name: "Aesthetic Typo Print Shirt",
    price: 899,
    description: "Chic typography print on a soft, flowy fabric. Elevates any basic outfit instantly.",
    category: "women",
    sizes: [{ size: "XS", stock: 5 }, { size: "S", stock: 15 }, { size: "M", stock: 20 }, { size: "L", stock: 12 }],
    colors: [{ name: "Off White", hex: "#FAF9F6" }, { name: "Sage", hex: "#9DC183" }],
    images: [
      "/images/Picsart_26-02-11_21-11-53-680.jpg",
      "/images/Picsart_26-02-11_21-13-06-506.jpg"
    ],
    isBestSeller: true,
  },
  {
    name: "Lounge Oversized Hoodie",
    price: 1499,
    description: "Plush fleece-lined interior. Ultimate cozy wear for chilling at home or running errands in style.",
    category: "women",
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 12 }, { size: "L", stock: 15 }, { size: "XL", stock: 5 }],
    colors: [{ name: "Heather Gray", hex: "#B0B0B0" }, { name: "Mocha", hex: "#A38068" }],
    images: [
      "/images/Picsart_26-02-11_21-13-45-942.jpg",
      "/images/Picsart_26-02-11_21-14-33-575.jpg"
    ],
  },
  {
    name: "Sleek Basic Camisole",
    price: 499,
    description: "Silky smooth finish with adjustable straps. A versatile staple for every wardrobe.",
    category: "women",
    sizes: [{ size: "XS", stock: 15 }, { size: "S", stock: 25 }, { size: "M", stock: 20 }],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Nude", hex: "#E3BC9A" }],
    images: [
      "/images/Picsart_26-02-11_21-16-01-905.jpg",
      "/images/Picsart_26-02-11_21-17-02-399.jpg"
    ],
  },
  {
    name: "Signature Abstract Print Tee",
    price: 999,
    description: "Turn heads with this modern abstract design. Crafted from lightweight, breathable fabric.",
    category: "women",
    colors: [{ name: "Navy/White", hex: "#000080" }, { name: "Coral", hex: "#FF7F50" }],
    images: [
      "/images/Picsart_26-02-11_21-29-02-090.jpg" 
    ],
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 15 }, { size: "L", stock: 10 }]
  },

  // --- NEW ARRIVALS (Feb 13) ---
  {
    name: "Urban Street Graphic Tee",
    price: 899,
    description: "Fresh drop featuring bold street-style graphics. Premium cotton blend for all-day comfort.",
    category: "men",
    sizes: [{ size: "S", stock: 15 }, { size: "M", stock: 25 }, { size: "L", stock: 20 }, { size: "XL", stock: 10 }],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Grey", hex: "#808080" }],
    images: [
      "/images/Picsart_26-02-13_09-53-09-572.jpg",
      "/images/Picsart_26-02-13_09-53-47-101.jpg"
    ],
    isBestSeller: true
  },
  {
    name: "Floral Summer Breeze Top",
    price: 799,
    description: "Lightweight and airy top perfect for the season. Features a subtle floral print.",
    category: "women",
    sizes: [{ size: "XS", stock: 10 }, { size: "S", stock: 20 }, { size: "M", stock: 15 }],
    colors: [{ name: "Pink", hex: "#FFC0CB" }, { name: "White", hex: "#FFFFFF" }],
    images: [
      "/images/Picsart_26-02-13_09-56-10-499.jpg",
      "/images/Picsart_26-02-13_09-57-07-580.jpg"
    ],
  },
  {
    name: "Modern Oversized Hoodie",
    price: 1299,
    description: "Relaxed fit hoodie with dropped shoulders. The perfect layer for cool evenings.",
    category: "men",
    sizes: [{ size: "M", stock: 20 }, { size: "L", stock: 25 }, { size: "XL", stock: 15 }],
    colors: [{ name: "Beige", hex: "#F5F5DC" }, { name: "Brown", hex: "#A52A2A" }],
    images: [
      "/images/Picsart_26-02-13_09-57-34-515.jpg",
      "/images/Picsart_26-02-13_10-12-00-747.jpg"
    ],
  },
  {
    name: "Chic Evening Ensemble",
    price: 1499,
    description: "Elegant and sophisticated. Designed for those special occasions where you want to stand out.",
    category: "women",
    sizes: [{ size: "S", stock: 12 }, { size: "M", stock: 18 }, { size: "L", stock: 10 }],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Gold", hex: "#FFD700" }],
    images: [
      "/images/Picsart_26-02-13_10-22-18-512.jpg",
      "/images/Picsart_26-02-13_10-22-58-846.jpg"
    ],
  },
  {
    name: "Casual Weekend Vibes Tee",
    price: 599,
    description: "Your go-to tee for the weekend. Soft fabric and easy fit.",
    category: "men",
    sizes: [{ size: "S", stock: 15 }, { size: "M", stock: 30 }, { size: "L", stock: 25 }],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Navy", hex: "#000080" }],
    images: [
      "/images/Picsart_26-02-13_10-23-47-768.jpg"
    ],
  }
];

module.exports = products;