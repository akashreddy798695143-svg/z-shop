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
  // ─── Electronics (10) ────────────────────────────────────────────────────
  {
    name: 'Pro Wireless Headphones',
    slug: 'pro-wireless-headphones',
    description: 'Premium noise-cancelling wireless headphones with 40-hour battery life, adaptive sound control, and crystal-clear audio. Features multi-device pairing, touch controls, and ultra-comfortable memory foam ear cushions.',
    price: 299.99, compareAtPrice: 399.99,
    images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 2456, stock: 150, featured: true,
  },
  {
    name: 'Smart Watch Ultra',
    slug: 'smart-watch-ultra',
    description: 'Advanced smartwatch with always-on AMOLED display, health monitoring suite, GPS tracking, and 7-day battery life. Water resistant to 100m with titanium case.',
    price: 449.99, compareAtPrice: 549.99,
    images: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 1832, stock: 80, featured: true,
  },
  {
    name: '4K Ultra HD Monitor',
    slug: '4k-ultra-hd-monitor',
    description: 'Stunning 32-inch 4K UHD monitor with HDR600, 144Hz refresh rate, and 1ms response time. Perfect for gaming and creative work with 98% DCI-P3 color gamut.',
    price: 599.99, compareAtPrice: 799.99,
    images: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 987, stock: 45, featured: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Waterproof portable speaker with 360° immersive sound, 24-hour playtime, and built-in microphone. Perfect for outdoor adventures with IP67 rating.',
    price: 129.99, compareAtPrice: 179.99,
    images: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 3241, stock: 200, featured: false,
  },
  {
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overheat protection. Supports up to 15W fast charging.',
    price: 39.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.3, reviewCount: 1567, stock: 300, featured: false,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB mechanical keyboard with hot-swappable switches, PBT keycaps, and programmable macros. Features USB-C connection and aircraft-grade aluminum frame.',
    price: 169.99, compareAtPrice: 199.99,
    images: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 2134, stock: 120, featured: false,
  },
  {
    name: 'Drone Camera 4K',
    slug: 'drone-camera-4k',
    description: 'Professional-grade 4K drone with 3-axis gimbal stabilization, 40-minute flight time, obstacle avoidance sensors, and intelligent flight modes. Foldable design with carrying case.',
    price: 899.99, compareAtPrice: 1099.99,
    images: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 1456, stock: 25, featured: true,
  },
  {
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    description: 'Ultra-lightweight wireless gaming mouse with 25K DPI sensor, 70-hour battery, and optical switches. Ergonomic design with customizable RGB and 5 programmable buttons.',
    price: 89.99, compareAtPrice: 119.99,
    images: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 3789, stock: 175, featured: false,
  },
  {
    name: 'Action Camera Waterproof',
    slug: 'action-camera-waterproof',
    description: 'Rugged action camera shooting 5.3K video at 60fps with HyperSmooth stabilization. Waterproof to 33ft, voice-controlled, with dual LCD screens and live streaming.',
    price: 349.99, compareAtPrice: 429.99,
    images: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1615886541776-3b271e14c079?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 2567, stock: 65, featured: true,
  },
  {
    name: 'USB-C Hub Multiport',
    slug: 'usb-c-hub-multiport',
    description: '12-in-1 USB-C hub with dual HDMI 4K@60Hz, 100W PD charging, Gigabit Ethernet, SD/microSD readers, and 3 USB 3.0 ports. Aluminum housing with thermal management.',
    price: 59.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 1890, stock: 400, featured: false,
  },

  // ─── Fashion (9) ────────────────────────────────────────────────────────
  {
    name: 'Classic Leather Jacket',
    slug: 'classic-leather-jacket',
    description: 'Handcrafted genuine leather jacket with premium lining and timeless design. Features multiple pockets, YKK zippers, and adjustable cuffs for the perfect fit.',
    price: 249.99, compareAtPrice: 349.99,
    images: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 876, stock: 35, featured: true,
  },
  {
    name: 'Running Sneakers Pro',
    slug: 'running-sneakers-pro',
    description: 'Ultra-lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for performance with carbon fiber plate and energy return foam.',
    price: 179.99, compareAtPrice: 219.99,
    images: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 4521, stock: 90, featured: true,
  },
  {
    name: 'Premium Denim Jeans',
    slug: 'premium-denim-jeans',
    description: 'Premium stretch denim jeans with modern slim fit. Made from organic cotton with reinforced stitching and vintage wash finish.',
    price: 89.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 2345, stock: 150, featured: false,
  },
  {
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    description: 'Polarized designer sunglasses with UV400 protection and lightweight titanium frame. Includes premium carrying case and microfiber cloth.',
    price: 159.99, compareAtPrice: 199.99,
    images: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 1234, stock: 60, featured: false,
  },
  {
    name: 'Canvas Backpack',
    slug: 'canvas-backpack',
    description: 'Durable waxed canvas backpack with leather accents, padded laptop compartment, and multiple organizer pockets. Perfect for daily commute or weekend trips.',
    price: 79.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1581605405669-fcdf81165b94?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 3421, stock: 110, featured: false,
  },
  {
    name: 'Wool Blend Overcoat',
    slug: 'wool-blend-overcoat',
    description: 'Luxurious Italian wool blend overcoat with satin lining, notch lapel, and two-button closure. Tailored fit with interior pockets and vented back.',
    price: 329.99, compareAtPrice: 449.99,
    images: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 654, stock: 28, featured: true,
  },
  {
    name: 'Casual Linen Shirt',
    slug: 'casual-linen-shirt',
    description: '100% European linen shirt with relaxed fit, mother-of-pearl buttons, and garment-washed softness. Breathable fabric perfect for warm weather.',
    price: 64.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 1876, stock: 200, featured: false,
  },
  {
    name: 'Leather Belt Classic',
    slug: 'leather-belt-classic',
    description: 'Full-grain leather belt with brushed stainless steel buckle. Hand-stitched edges and 1.25-inch width. Available in black, brown, and tan.',
    price: 44.99, compareAtPrice: 59.99,
    images: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 2876, stock: 300, featured: false,
  },
  {
    name: 'Silk Tie Collection',
    slug: 'silk-tie-collection',
    description: 'Set of 3 premium silk ties with matching pocket squares. Handmade with Italian silk, featuring classic patterns and rich colors for every occasion.',
    price: 74.99, compareAtPrice: 99.99,
    images: 'https://images.unsplash.com/photo-1589756823695-278bc923a203?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.3, reviewCount: 987, stock: 85, featured: false,
  },

  // ─── Home & Living (9) ──────────────────────────────────────────────────
  {
    name: 'Smart Home Speaker',
    slug: 'smart-home-speaker',
    description: 'Voice-controlled smart speaker with premium sound quality, smart home hub, and multi-room audio support. Compatible with all major smart home platforms.',
    price: 99.99, compareAtPrice: 129.99,
    images: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 5678, stock: 200, featured: true,
  },
  {
    name: 'Scented Candle Set',
    slug: 'scented-candle-set',
    description: 'Luxury soy wax candle set with 6 seasonal scents. Hand-poured with natural essential oils, cotton wicks, and up to 50 hours burn time each.',
    price: 49.99, compareAtPrice: 69.99,
    images: 'https://images.unsplash.com/photo-1602607912093-fbc049d37744?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1603199506016-5f36e6d72b0c?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 2189, stock: 180, featured: false,
  },
  {
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    description: 'Minimalist LED table lamp with touch dimmer, color temperature adjustment, and wireless charging base. Sustainable bamboo and aluminum design.',
    price: 79.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 876, stock: 70, featured: false,
  },
  {
    name: 'Luxury Bed Sheet Set',
    slug: 'luxury-bed-sheet-set',
    description: '1000-thread-count Egyptian cotton sheet set with sateen weave. Includes flat sheet, fitted sheet, and 4 pillowcases. Hypoallergenic and ultra-soft.',
    price: 129.99, compareAtPrice: 189.99,
    images: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 3456, stock: 95, featured: false,
  },
  {
    name: 'Robot Vacuum Cleaner',
    slug: 'robot-vacuum-cleaner',
    description: 'AI-powered robot vacuum with LiDAR navigation, self-emptying base, and mopping function. App-controlled with scheduling and room mapping.',
    price: 399.99, compareAtPrice: 549.99,
    images: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1603618090554-a7422dfa9a20?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 2876, stock: 55, featured: true,
  },
  {
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set of 4 handcrafted ceramic plant pots in varying sizes with drainage holes and saucers. Matte finish in earth tones, perfect for indoor herbs and succulents.',
    price: 54.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 1567, stock: 140, featured: false,
  },
  {
    name: 'Espresso Coffee Machine',
    slug: 'espresso-coffee-machine',
    description: 'Automatic espresso machine with 15-bar pump, built-in grinder, milk frother, and programmable settings. Brews barista-quality coffee at home with one touch.',
    price: 349.99, compareAtPrice: 499.99,
    images: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 4231, stock: 40, featured: true,
  },
  {
    name: 'Throw Blanket Knit',
    slug: 'throw-blanket-knit',
    description: 'Chunky knit throw blanket made from 100% organic cotton. Oversized 50x60 inch design, machine washable, and incredibly soft. Perfect for cozy evenings.',
    price: 69.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1580301762395-21ce12d4bc4b?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 2789, stock: 120, featured: false,
  },
  {
    name: 'Wall Art Canvas Print',
    slug: 'wall-art-canvas-print',
    description: 'Set of 3 modern abstract canvas prints on premium gallery-wrap canvas. Ready to hang with included hardware. Each panel measures 16x24 inches.',
    price: 89.99, compareAtPrice: 129.99,
    images: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 1234, stock: 75, featured: false,
  },

  // ─── Sports & Outdoors (8) ──────────────────────────────────────────────
  {
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra thick non-slip yoga mat made from natural rubber with alignment markings. Eco-friendly, sweat-resistant, and comes with carrying strap.',
    price: 59.99, compareAtPrice: 79.99,
    images: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 4321, stock: 200, featured: false,
  },
  {
    name: 'Insulated Water Bottle',
    slug: 'insulated-water-bottle',
    description: 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold 24hrs or hot 12hrs. BPA-free with leak-proof lid and powder coat finish.',
    price: 34.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1523362628745-0c100fc988a8?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 7654, stock: 350, featured: true,
  },
  {
    name: 'Camping Tent 4-Person',
    slug: 'camping-tent-4-person',
    description: 'Lightweight 4-person dome tent with waterproof rating 3000mm, easy setup in 5 minutes, and included footprint. Perfect for family camping trips.',
    price: 199.99, compareAtPrice: 279.99,
    images: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1478131143263-27a1afd38a4f?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 1234, stock: 40, featured: false,
  },
  {
    name: 'Fitness Tracker Band',
    slug: 'fitness-tracker-band',
    description: 'Slim fitness tracker with heart rate monitoring, sleep tracking, SpO2 sensor, and 14-day battery. Water resistant with 20+ exercise modes.',
    price: 69.99, compareAtPrice: 89.99,
    images: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1510017803434-a899f8cb4681?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 5432, stock: 250, featured: false,
  },
  {
    name: 'Mountain Bike Helmet',
    slug: 'mountain-bike-helmet',
    description: 'Lightweight MTB helmet with MIPS protection, adjustable visor, and 18 ventilation ports. In-mold polycarbonate shell with comfortable padding system.',
    price: 119.99, compareAtPrice: 159.99,
    images: 'https://images.unsplash.com/photo-1557803175-2f6e54b1302b?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 2345, stock: 85, featured: false,
  },
  {
    name: 'Adjustable Dumbbell Set',
    slug: 'adjustable-dumbbell-set',
    description: 'Space-saving adjustable dumbbell set from 5 to 52.5 lbs per hand. Quick-change dial mechanism, durable steel construction with anti-slip grip.',
    price: 299.99, compareAtPrice: 399.99,
    images: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 3456, stock: 35, featured: true,
  },
  {
    name: 'Hiking Backpack 40L',
    slug: 'hiking-backpack-40l',
    description: 'Lightweight 40L hiking backpack with ventilated back panel, rain cover, and hydration compatible. Multiple compartments with compression straps and hip belt pockets.',
    price: 149.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 1678, stock: 65, featured: false,
  },
  {
    name: 'Resistance Band Set',
    slug: 'resistance-band-set',
    description: 'Complete set of 5 resistance bands with varying tensions from 5-125 lbs. Includes door anchor, handles, ankle straps, and carrying bag for home workouts.',
    price: 29.99, compareAtPrice: 44.99,
    images: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 6543, stock: 450, featured: false,
  },

  // ─── Books & Media (7) ──────────────────────────────────────────────────
  {
    name: 'E-Reader Paperwhite',
    slug: 'e-reader-paperwhite',
    description: '6.8-inch glare-free e-reader with adjustable warm light, 32GB storage, and 10-week battery life. Waterproof with USB-C and Audible support.',
    price: 139.99, compareAtPrice: 179.99,
    images: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 8765, stock: 180, featured: true,
  },
  {
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'True wireless earbuds with active noise cancellation, spatial audio, and 30-hour total battery. IPX4 water resistant with wireless charging case.',
    price: 199.99, compareAtPrice: 249.99,
    images: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 6543, stock: 160, featured: true,
  },
  {
    name: 'Bluetooth Turntable',
    slug: 'bluetooth-turntable',
    description: 'Belt-drive turntable with Bluetooth output, built-in phono preamp, and anti-vibration design. Plays 33-1/3 and 45 RPM vinyl records with audiophile quality.',
    price: 249.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1571333103957-5fdc0c35c8a8?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 987, stock: 30, featured: false,
  },
  {
    name: 'Noise-Cancelling Headphones',
    slug: 'noise-cancelling-headphones',
    description: 'Over-ear headphones with industry-leading ANC, 30-hour battery, and multipoint connection. Features transparency mode, foldable design, and premium travel case.',
    price: 349.99, compareAtPrice: 449.99,
    images: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.8, reviewCount: 5432, stock: 70, featured: true,
  },
  {
    name: 'Portable Projector HD',
    slug: 'portable-projector-hd',
    description: 'Compact 1080p projector with built-in speakers, WiFi, and Bluetooth. Projects up to 120 inches with keystone correction. Perfect for movie nights and presentations.',
    price: 279.99, compareAtPrice: 359.99,
    images: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1598890935858-b7a8a510d0b4?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 1876, stock: 45, featured: false,
  },
  {
    name: 'Vinyl Record Box Set',
    slug: 'vinyl-record-box-set',
    description: 'Deluxe 5-LP vinyl box set featuring iconic greatest hits on 180-gram audiophile vinyl. Includes lyric book, exclusive poster, and digital download code.',
    price: 89.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.9, reviewCount: 765, stock: 20, featured: false,
  },
  {
    name: 'Drawing Tablet Pro',
    slug: 'drawing-tablet-pro',
    description: 'Professional pen display tablet with 13-inch Full HD screen, 8192 pressure levels, and tilt recognition. Includes battery-free stylus and creative software bundle.',
    price: 449.99, compareAtPrice: 599.99,
    images: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1586182988905-338932bdc5a0?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 2134, stock: 50, featured: true,
  },

  // ─── Beauty & Health (7) ────────────────────────────────────────────────
  {
    name: 'Skincare Gift Set',
    slug: 'skincare-gift-set',
    description: 'Premium 5-piece skincare set including cleanser, toner, serum, moisturizer, and eye cream. Made with natural ingredients and no parabens.',
    price: 89.99, compareAtPrice: 129.99,
    images: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1570194065650-d99fb4ee7687?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 3456, stock: 100, featured: false,
  },
  {
    name: 'Electric Toothbrush',
    slug: 'electric-toothbrush',
    description: 'Sonic electric toothbrush with 5 brushing modes, 2-minute smart timer, and 30-day battery. Includes 4 brush heads and travel case.',
    price: 49.99, compareAtPrice: 69.99,
    images: 'https://images.unsplash.com/photo-1559591937-2c22c3e3fef9?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1609839216965-6a1c5c8e4d44?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 4321, stock: 220, featured: false,
  },
  {
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Ultrasonic essential oil diffuser with 7-color LED mood lighting and auto shut-off. 300ml capacity with whisper-quiet operation for up to 10 hours.',
    price: 39.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.5, reviewCount: 2876, stock: 190, featured: false,
  },
  {
    name: 'Hair Dryer Professional',
    slug: 'hair-dryer-professional',
    description: 'Salon-grade hair dryer with ionic technology, 3 heat settings, 2 speed settings, and cool shot button. Lightweight motor with concentrator and diffuser attachments.',
    price: 149.99, compareAtPrice: 199.99,
    images: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 3210, stock: 80, featured: true,
  },
  {
    name: 'Jade Face Roller Set',
    slug: 'jade-face-roller-set',
    description: 'Natural jade face roller and gua sha set for facial massage. Helps reduce puffiness, improve circulation, and enhance product absorption. Comes in silk pouch.',
    price: 24.99, compareAtPrice: 34.99,
    images: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.4, reviewCount: 5678, stock: 250, featured: false,
  },
  {
    name: 'Luxury Bath Bomb Collection',
    slug: 'luxury-bath-bomb-collection',
    description: 'Set of 12 handmade bath bombs with natural essential oils, Epsom salts, and dried flowers. Vegan, cruelty-free, and individually wrapped for gifting.',
    price: 34.99, compareAtPrice: null,
    images: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.7, reviewCount: 4532, stock: 160, featured: false,
  },
  {
    name: 'Vitamin C Serum',
    slug: 'vitamin-c-serum',
    description: 'Professional-grade 20% Vitamin C serum with hyaluronic acid and vitamin E. Brightens skin, reduces dark spots, and boosts collagen. Dermatologist tested.',
    price: 29.99, compareAtPrice: 44.99,
    images: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop,https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    categoryId: '', rating: 4.6, reviewCount: 8765, stock: 380, featured: false,
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
  await db.user.deleteMany();

  // Create demo user (password: demo123)
  const demoUser = await db.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@zshop.com',
      password: 'demo123',
    },
  });
  console.log(`Created demo user: ${demoUser.email}`);

  // Create categories
  const categoryRecords = [];
  for (const cat of categories) {
    const record = await db.category.create({ data: cat });
    categoryRecords.push(record);
    console.log(`Created category: ${cat.name}`);
  }

  const categoryMap: Record<string, string> = {};
  categoryRecords.forEach((c) => {
    categoryMap[c.slug] = c.id;
  });

  const categorySlugs = [
    'electronics', 'electronics', 'electronics', 'electronics', 'electronics',
    'electronics', 'electronics', 'electronics', 'electronics', 'electronics',
    'fashion', 'fashion', 'fashion', 'fashion', 'fashion',
    'fashion', 'fashion', 'fashion', 'fashion',
    'home-living', 'home-living', 'home-living', 'home-living', 'home-living',
    'home-living', 'home-living', 'home-living', 'home-living',
    'sports-outdoors', 'sports-outdoors', 'sports-outdoors', 'sports-outdoors',
    'sports-outdoors', 'sports-outdoors', 'sports-outdoors', 'sports-outdoors',
    'books-media', 'books-media', 'books-media', 'books-media',
    'books-media', 'books-media', 'books-media',
    'beauty-health', 'beauty-health', 'beauty-health', 'beauty-health',
    'beauty-health', 'beauty-health', 'beauty-health',
  ];

  for (let i = 0; i < products.length; i++) {
    const product = { ...products[i], categoryId: categoryMap[categorySlugs[i]] };
    await db.product.create({ data: product });
    console.log(`Created product: ${product.name}`);
  }

  console.log('\nSeeding complete!');
  console.log(`Created 1 demo user (demo@zshop.com / demo123)`);
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
