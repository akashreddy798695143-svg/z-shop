import { db } from '../src/lib/db';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, phones, laptops, and smart devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing, shoes, and accessories for all',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Furniture, decor, and essentials for your home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear up for adventure and fitness',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=300&fit=crop',
  },
  {
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Bestsellers, audiobooks, movies, and music',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
  },
  {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description: 'Skincare, makeup, wellness, and personal care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
  },
];

const products = [
  // Electronics
  {
    name: 'Pro Wireless Headphones',
    slug: 'pro-wireless-headphones',
    description: 'Premium noise-cancelling wireless headphones with 40-hour battery life, adaptive sound control, and crystal-clear audio. Features multi-device pairing, touch controls, and ultra-comfortable memory foam ear cushions.',
    price: 299.99,
    compareAtPrice: 399.99,
    images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.8,
    reviewCount: 2456,
    stock: 150,
    featured: true,
  },
  {
    name: 'Smart Watch Ultra',
    slug: 'smart-watch-ultra',
    description: 'Advanced smartwatch with always-on AMOLED display, health monitoring suite, GPS tracking, and 7-day battery life. Water resistant to 100m with titanium case.',
    price: 449.99,
    compareAtPrice: 549.99,
    images: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 1832,
    stock: 80,
    featured: true,
  },
  {
    name: '4K Ultra HD Monitor',
    slug: '4k-ultra-hd-monitor',
    description: 'Stunning 32-inch 4K UHD monitor with HDR600, 144Hz refresh rate, and 1ms response time. Perfect for gaming and creative work with 98% DCI-P3 color gamut.',
    price: 599.99,
    compareAtPrice: 799.99,
    images: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 987,
    stock: 45,
    featured: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Waterproof portable speaker with 360° immersive sound, 24-hour playtime, and built-in microphone. Perfect for outdoor adventures with IP67 rating.',
    price: 129.99,
    compareAtPrice: 179.99,
    images: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.5,
    reviewCount: 3241,
    stock: 200,
    featured: false,
  },
  {
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overheat protection. Supports up to 15W fast charging.',
    price: 39.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.3,
    reviewCount: 1567,
    stock: 300,
    featured: false,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB mechanical keyboard with hot-swappable switches, PBT keycaps, and programmable macros. Features USB-C connection and aircraft-grade aluminum frame.',
    price: 169.99,
    compareAtPrice: 199.99,
    images: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 2134,
    stock: 120,
    featured: false,
  },

  // Fashion
  {
    name: 'Classic Leather Jacket',
    slug: 'classic-leather-jacket',
    description: 'Handcrafted genuine leather jacket with premium lining and timeless design. Features multiple pockets, YKK zippers, and adjustable cuffs for the perfect fit.',
    price: 249.99,
    compareAtPrice: 349.99,
    images: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 876,
    stock: 35,
    featured: true,
  },
  {
    name: 'Running Sneakers Pro',
    slug: 'running-sneakers-pro',
    description: 'Ultra-lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for performance with carbon fiber plate and energy return foam.',
    price: 179.99,
    compareAtPrice: 219.99,
    images: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.8,
    reviewCount: 4521,
    stock: 90,
    featured: true,
  },
  {
    name: 'Premium Denim Jeans',
    slug: 'premium-denim-jeans',
    description: 'Premium stretch denim jeans with modern slim fit. Made from organic cotton with reinforced stitching and vintage wash finish.',
    price: 89.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.4,
    reviewCount: 2345,
    stock: 150,
    featured: false,
  },
  {
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    description: 'Polarized designer sunglasses with UV400 protection and lightweight titanium frame. Includes premium carrying case and microfiber cloth.',
    price: 159.99,
    compareAtPrice: 199.99,
    images: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.5,
    reviewCount: 1234,
    stock: 60,
    featured: false,
  },
  {
    name: 'Canvas Backpack',
    slug: 'canvas-backpack',
    description: 'Durable waxed canvas backpack with leather accents, padded laptop compartment, and multiple organizer pockets. Perfect for daily commute or weekend trips.',
    price: 79.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 3421,
    stock: 110,
    featured: false,
  },

  // Home & Living
  {
    name: 'Smart Home Speaker',
    slug: 'smart-home-speaker',
    description: 'Voice-controlled smart speaker with premium sound quality, smart home hub, and multi-room audio support. Compatible with all major smart home platforms.',
    price: 99.99,
    compareAtPrice: 129.99,
    images: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.4,
    reviewCount: 5678,
    stock: 200,
    featured: true,
  },
  {
    name: 'Scented Candle Set',
    slug: 'scented-candle-set',
    description: 'Luxury soy wax candle set with 6 seasonal scents. Hand-poured with natural essential oils, cotton wicks, and up to 50 hours burn time each.',
    price: 49.99,
    compareAtPrice: 69.99,
    images: 'https://images.unsplash.com/photo-1602607912093-fbc049d37744?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 2189,
    stock: 180,
    featured: false,
  },
  {
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    description: 'Minimalist LED table lamp with touch dimmer, color temperature adjustment, and wireless charging base. Sustainable bamboo and aluminum design.',
    price: 79.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.5,
    reviewCount: 876,
    stock: 70,
    featured: false,
  },
  {
    name: 'Luxury Bed Sheet Set',
    slug: 'luxury-bed-sheet-set',
    description: '1000-thread-count Egyptian cotton sheet set with sateen weave. Includes flat sheet, fitted sheet, and 4 pillowcases. Hypoallergenic and ultra-soft.',
    price: 129.99,
    compareAtPrice: 189.99,
    images: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.8,
    reviewCount: 3456,
    stock: 95,
    featured: false,
  },
  {
    name: 'Robot Vacuum Cleaner',
    slug: 'robot-vacuum-cleaner',
    description: 'AI-powered robot vacuum with LiDAR navigation, self-emptying base, and mopping function. App-controlled with scheduling and room mapping.',
    price: 399.99,
    compareAtPrice: 549.99,
    images: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 2876,
    stock: 55,
    featured: true,
  },

  // Sports & Outdoors
  {
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra thick non-slip yoga mat made from natural rubber with alignment markings. Eco-friendly, sweat-resistant, and comes with carrying strap.',
    price: 59.99,
    compareAtPrice: 79.99,
    images: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 4321,
    stock: 200,
    featured: false,
  },
  {
    name: 'Insulated Water Bottle',
    slug: 'insulated-water-bottle',
    description: 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold 24hrs or hot 12hrs. BPA-free with leak-proof lid and powder coat finish.',
    price: 34.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.8,
    reviewCount: 7654,
    stock: 350,
    featured: true,
  },
  {
    name: 'Camping Tent 4-Person',
    slug: 'camping-tent-4-person',
    description: 'Lightweight 4-person dome tent with waterproof rating 3000mm, easy setup in 5 minutes, and included footprint. Perfect for family camping trips.',
    price: 199.99,
    compareAtPrice: 279.99,
    images: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.5,
    reviewCount: 1234,
    stock: 40,
    featured: false,
  },
  {
    name: 'Fitness Tracker Band',
    slug: 'fitness-tracker-band',
    description: 'Slim fitness tracker with heart rate monitoring, sleep tracking, SpO2 sensor, and 14-day battery. Water resistant with 20+ exercise modes.',
    price: 69.99,
    compareAtPrice: 89.99,
    images: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.4,
    reviewCount: 5432,
    stock: 250,
    featured: false,
  },

  // Books & Media
  {
    name: 'E-Reader Paperwhite',
    slug: 'e-reader-paperwhite',
    description: '6.8-inch glare-free e-reader with adjustable warm light, 32GB storage, and 10-week battery life. Waterproof with USB-C and Audible support.',
    price: 139.99,
    compareAtPrice: 179.99,
    images: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.8,
    reviewCount: 8765,
    stock: 180,
    featured: true,
  },
  {
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'True wireless earbuds with active noise cancellation, spatial audio, and 30-hour total battery. IPX4 water resistant with wireless charging case.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 6543,
    stock: 160,
    featured: true,
  },
  {
    name: 'Bluetooth Turntable',
    slug: 'bluetooth-turntable',
    description: 'Belt-drive turntable with Bluetooth output, built-in phono preamp, and anti-vibration design. Plays 33-1/3 and 45 RPM vinyl records with audiophile quality.',
    price: 249.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 987,
    stock: 30,
    featured: false,
  },

  // Beauty & Health
  {
    name: 'Skincare Gift Set',
    slug: 'skincare-gift-set',
    description: 'Premium 5-piece skincare set including cleanser, toner, serum, moisturizer, and eye cream. Made with natural ingredients and no parabens.',
    price: 89.99,
    compareAtPrice: 129.99,
    images: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.7,
    reviewCount: 3456,
    stock: 100,
    featured: false,
  },
  {
    name: 'Electric Toothbrush',
    slug: 'electric-toothbrush',
    description: 'Sonic electric toothbrush with 5 brushing modes, 2-minute smart timer, and 30-day battery. Includes 4 brush heads and travel case.',
    price: 49.99,
    compareAtPrice: 69.99,
    images: 'https://images.unsplash.com/photo-1559591937-2c22c3e3fef9?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.6,
    reviewCount: 4321,
    stock: 220,
    featured: false,
  },
  {
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Ultrasonic essential oil diffuser with 7-color LED mood lighting and auto shut-off. 300ml capacity with whisper-quiet operation for up to 10 hours.',
    price: 39.99,
    compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
    categoryId: '',
    rating: 4.5,
    reviewCount: 2876,
    stock: 190,
    featured: false,
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.cartItem.deleteMany();
  await db.cart.deleteMany();
  await db.product.deleteMany();
  await db.category.deleteMany();

  // Create categories
  const categoryRecords = [];
  for (const cat of categories) {
    const record = await db.category.create({ data: cat });
    categoryRecords.push(record);
    console.log(`Created category: ${cat.name}`);
  }

  // Assign category IDs to products
  const categoryMap: Record<string, string> = {};
  categoryRecords.forEach((c) => {
    categoryMap[c.slug] = c.id;
  });

  const categorySlugs = [
    'electronics', 'electronics', 'electronics', 'electronics', 'electronics', 'electronics',
    'fashion', 'fashion', 'fashion', 'fashion', 'fashion',
    'home-living', 'home-living', 'home-living', 'home-living', 'home-living',
    'sports-outdoors', 'sports-outdoors', 'sports-outdoors', 'sports-outdoors',
    'books-media', 'books-media', 'books-media',
    'beauty-health', 'beauty-health', 'beauty-health',
  ];

  // Create products
  for (let i = 0; i < products.length; i++) {
    const product = { ...products[i], categoryId: categoryMap[categorySlugs[i]] };
    await db.product.create({ data: product });
    console.log(`Created product: ${product.name}`);
  }

  console.log('\nSeeding complete!');
  console.log(`Created ${categoryRecords.length} categories`);
  console.log(`Created ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
