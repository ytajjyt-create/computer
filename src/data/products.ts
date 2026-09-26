import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ================= PRE-BUILT DESKTOPS =================
  {
    id: 'pc-apex-5090',
    name: 'Valence Apex Sovereign RTX 5090',
    brand: 'VALENCE LABS',
    category: 'desktops',
    price: 4399,
    originalPrice: 4799,
    rating: 4.95,
    reviewsCount: 38,
    inStock: true,
    stockCount: 7,
    featured: true,
    badge: 'FLAGSHIP MONSTER',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Intel Core Ultra 9 285K, GeForce RTX 5090 32GB, 64GB DDR5-6400, 4TB Gen5 NVMe, Custom Hardline Loop.',
    fullDesc: 'The apex of computational power. Engineered for 4K 240Hz path-traced gaming, extreme neural model training, and photorealistic 3D render farm simulation. Assembled in a custom Lian Li O11 Vision chassis with hand-polished nickel hardline tubing, dual 360mm radiators, and a 48-hour synthetic burn-in validation certification included.',
    specs: [
      { label: 'Processor', value: 'Intel Core Ultra 9 285K (24 Cores, up to 5.7 GHz)' },
      { label: 'Graphics Card', value: 'NVIDIA GeForce RTX 5090 32GB GDDR7' },
      { label: 'Memory', value: '64GB (2x32GB) Corsair Dominator Titanium DDR5-6400 CL30' },
      { label: 'Storage', value: '4TB Crucial T705 PCIe Gen5 NVMe (14,500 MB/s)' },
      { label: 'Motherboard', value: 'ASUS ROG Maximus Z890 Hero WiFi 7' },
      { label: 'Cooling', value: 'Valence Custom Hardline Liquid Loop with 360mm Rad' },
      { label: 'Power Supply', value: 'Seasonic Vertex GX-1200W ATX 3.0 80+ Platinum' },
      { label: 'Chassis', value: 'Lian Li O11 Vision Tempered Smoked Glass' },
      { label: 'Operating System', value: 'Windows 11 Pro Clean Enthuiast Edition (Zero Bloat)' },
      { label: 'Warranty', value: '3-Year On-Site Rapid Replacement' }
    ],
    benchmarks: [
      { game: 'Cyberpunk 2077 (4K RT Overdrive + DLSS 4)', fps: 138, resolution: '3840x2160', preset: 'Ultra RT' },
      { game: 'Black Myth: Wukong (4K Cinematic)', fps: 144, resolution: '3840x2160', preset: 'Cinematic Max' },
      { game: 'Alan Wake 2 (4K Full Path Tracing)', fps: 122, resolution: '3840x2160', preset: 'High Path Traced' },
      { game: 'Call of Duty: Warzone (4K Competitive)', fps: 265, resolution: '3840x2160', preset: 'Extreme' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Dmitri V.',
        verifiedPurchase: true,
        rating: 5,
        date: '2026-08-14',
        title: 'Unbelievable thermal headroom and dead silent',
        comment: 'Running local 70B LLM quantization while rendering in Unreal Engine 5.4. Temperature barely touched 64C under sustained peak draw. Best build purchase of my life.'
      },
      {
        id: 'rev-2',
        author: 'Marcus Chen',
        verifiedPurchase: true,
        rating: 5,
        date: '2026-09-02',
        title: 'Packaging was bulletproof',
        comment: 'Came in a wooden reinforced crate with expanding custom foam. Cable management behind the back panel looks like art.'
      }
    ]
  },
  {
    id: 'pc-phantom-7800x3d',
    name: 'Valence Phantom V2 RTX 5080',
    brand: 'VALENCE LABS',
    category: 'desktops',
    price: 2899,
    originalPrice: 3099,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    stockCount: 12,
    featured: true,
    badge: 'ESPORTS CHAMPION',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'AMD Ryzen 7 9800X3D, RTX 5080 16GB, 32GB DDR5-6000 CL30, 2TB Gen4 NVMe, Fractal North Walnut.',
    fullDesc: 'Refined architectural elegance meets esports dominance. Housed in the award-winning Fractal North case featuring genuine American Walnut front slats and brass hardware accents. Powered by AMD 2nd Gen 3D V-Cache architecture for unparalleled 1% low frame-rate stability.',
    specs: [
      { label: 'Processor', value: 'AMD Ryzen 7 9800X3D (8 Cores / 16 Threads, 104MB Cache)' },
      { label: 'Graphics Card', value: 'GeForce RTX 5080 16GB GDDR7' },
      { label: 'Memory', value: '32GB (2x16GB) G.Skill Trident Z5 Neo RGB DDR5-6000 CL30' },
      { label: 'Storage', value: '2TB Samsung 990 PRO NVMe M.2 (7,450 MB/s)' },
      { label: 'Motherboard', value: 'MSI MAG X870 Tomahawk WiFi' },
      { label: 'Cooling', value: 'ARCTIC Liquid Freezer III 360 AIO with VRM Fan' },
      { label: 'Power Supply', value: 'Corsair RM1000x Shift ATX 3.0 1000W 80+ Gold' },
      { label: 'Chassis', value: 'Fractal Design North Charcoal Black (Real Walnut)' },
      { label: 'Warranty', value: '3-Year Comprehensive Care' }
    ],
    benchmarks: [
      { game: 'Valorant (1440p Competitive)', fps: 780, resolution: '2560x1440', preset: 'High' },
      { game: 'Counter-Strike 2 (1440p)', fps: 490, resolution: '2560x1440', preset: 'Very High' },
      { game: 'Cyberpunk 2077 (1440p Ray Tracing Ultra)', fps: 165, resolution: '2560x1440', preset: 'Ultra RT' },
      { game: 'Grand Theft Auto VI (Simulated 1440p)', fps: 130, resolution: '2560x1440', preset: 'Ultra' }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Elena Rostova',
        verifiedPurchase: true,
        rating: 5,
        date: '2026-08-28',
        title: 'Looks like high-end Scandinavian furniture',
        comment: 'No obnoxious gamer aesthetic. Fits into my modern interior studio seamlessly. Performance on my 360Hz OLED monitor is butter smooth.'
      }
    ]
  },
  {
    id: 'pc-eclipse-itx',
    name: 'Valence Eclipse Stealth Mini-ITX',
    brand: 'VALENCE LABS',
    category: 'desktops',
    price: 2199,
    originalPrice: 2399,
    rating: 4.88,
    reviewsCount: 29,
    inStock: true,
    stockCount: 5,
    badge: 'COMPACT POWERHOUSE',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'AMD Ryzen 7 7800X3D, RTX 4070 Ti Super 16GB, 32GB DDR5, 2TB NVMe, SSUPD Meshlicious 14L Form Factor.',
    fullDesc: 'Extreme desktop performance engineered into a portable 14.6-liter full-mesh vertical footprint. Zero compromises: full-length 3-slot graphics card support, dual-chamber thermal isolation, and whisper-quiet Noctua magnetic levitation fans.',
    specs: [
      { label: 'Processor', value: 'AMD Ryzen 7 7800X3D (8 Cores, up to 5.0 GHz)' },
      { label: 'Graphics Card', value: 'ASUS TUF RTX 4070 Ti Super 16GB GDDR6X' },
      { label: 'Memory', value: '32GB Corsair Vengeance DDR5-6000 CL30' },
      { label: 'Storage', value: '2TB WD_BLACK SN850X PCIe 4.0 NVMe' },
      { label: 'Motherboard', value: 'ASUS ROG Strix B650E-I Gaming WiFi' },
      { label: 'Cooling', value: 'NZXT Kraken Elite 280 RGB AIO' },
      { label: 'Power Supply', value: 'Corsair SF750 750W 80+ Platinum SFX' },
      { label: 'Chassis', value: 'SSUPD Meshlicious Full Mesh Black (14.6 Liters)' },
      { label: 'Warranty', value: '2-Year Standard Warranty' }
    ],
    benchmarks: [
      { game: 'Cyberpunk 2077 (1440p Ultra RT)', fps: 112, resolution: '2560x1440', preset: 'Ultra RT' },
      { game: 'Forza Horizon 5 (4K Extreme)', fps: 135, resolution: '3840x2160', preset: 'Extreme' },
      { game: 'Apex Legends (1440p Max)', fps: 280, resolution: '2560x1440', preset: 'Max' }
    ],
    reviews: []
  },

  // ================= HIGH-PERFORMANCE LAPTOPS =================
  {
    id: 'lap-blade-16',
    name: 'Razer Blade 16 Dual-Mode Mini-LED',
    brand: 'RAZER',
    category: 'laptops',
    price: 3499,
    originalPrice: 3799,
    rating: 4.87,
    reviewsCount: 44,
    inStock: true,
    stockCount: 9,
    featured: true,
    badge: 'DUAL MODE DISPLAY',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Intel Core i9-14900HX, RTX 4090 16GB (175W TGP), 32GB DDR5-5600, Dual-Mode Mini-LED 4K 120Hz / FHD 240Hz.',
    fullDesc: 'World’s first dual-mode Mini-LED display switching natively between ultra-sharp 4K 120Hz for cinematic creative workflows and ultra-fast FHD 240Hz for competitive gaming. CNC-milled aluminum unibody with patented vacuum vapor chamber cooling.',
    specs: [
      { label: 'Processor', value: 'Intel Core i9-14900HX (24 Cores, up to 5.8 GHz)' },
      { label: 'Graphics Card', value: 'NVIDIA GeForce RTX 4090 Mobile 16GB GDDR6 (175W max)' },
      { label: 'Display', value: '16.0" 16:10 Dual-Mode Mini-LED (UHD+ 120Hz / FHD+ 240Hz, 1000 nits HDR)' },
      { label: 'Memory', value: '32GB DDR5 5600MHz (Upgradeable to 96GB)' },
      { label: 'Storage', value: '2TB PCIe 4.0 NVMe M.2 (2x M.2 slots total)' },
      { label: 'Battery', value: '95.2 Wh Lithium-ion with 330W GaN Charger' },
      { label: 'Weight', value: '2.45 kg (5.40 lbs)' },
      { label: 'Warranty', value: '2-Year Manufacturer + Valence VIP Priority Support' }
    ],
    benchmarks: [
      { game: 'Cyberpunk 2077 (1600p RT Ultra)', fps: 98, resolution: '2560x1600', preset: 'Ultra RT' },
      { game: 'Call of Duty: MW3 (FHD 240Hz Mode)', fps: 235, resolution: '1920x1200', preset: 'Balanced' }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Julian Thorne',
        verifiedPurchase: true,
        rating: 5,
        date: '2026-07-22',
        title: 'The display is otherworldly',
        comment: 'Switching between 4K 120Hz for color grading in DaVinci Resolve and 240Hz for weekend gaming is mindblowing. Thermals are steady.'
      }
    ]
  },
  {
    id: 'lap-zephyrus-g16',
    name: 'ASUS ROG Zephyrus G16 OLED',
    brand: 'ASUS ROG',
    category: 'laptops',
    price: 2499,
    originalPrice: 2699,
    rating: 4.92,
    reviewsCount: 67,
    inStock: true,
    stockCount: 14,
    badge: 'ULTRALIGHT TITANIUM',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Intel Core Ultra 9 185H, RTX 4080 12GB, 32GB LPDDR5X, 2.5K 240Hz ROG Nebula OLED, 1.85kg Chassis.',
    fullDesc: 'The pinnacle of portable engineering. Measuring just 1.49cm thin with an ultra-rigid aluminum chassis and Slash Lighting array. 2.5K OLED panel with 0.2ms response time, 100% DCI-P3 coverage, and VESA DisplayHDR True Black 500.',
    specs: [
      { label: 'Processor', value: 'Intel Core Ultra 9 185H with dedicated Intel AI NPU' },
      { label: 'Graphics Card', value: 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB (115W)' },
      { label: 'Display', value: '16.0" 2.5K (2560x1600) OLED 240Hz / 0.2ms / G-SYNC' },
      { label: 'Memory', value: '32GB LPDDR5X-7467 onboard' },
      { label: 'Storage', value: '2TB PCIe 4.0 NVMe SSD' },
      { label: 'Audio', value: '6-speaker sound system with dual force-cancelling woofers' },
      { label: 'Weight', value: '1.85 kg (4.07 lbs)' },
      { label: 'Warranty', value: '2-Year International Warranty' }
    ],
    benchmarks: [
      { game: 'Cyberpunk 2077 (1600p High RT)', fps: 84, resolution: '2560x1600', preset: 'High RT' },
      { game: 'Shadow of Tomb Raider (1600p Max)', fps: 162, resolution: '2560x1600', preset: 'Ultra' }
    ],
    reviews: []
  },

  // ================= PROCESSORS (CPUs) =================
  {
    id: 'cpu-9950x',
    name: 'AMD Ryzen 9 9950X',
    brand: 'AMD',
    category: 'cpu',
    price: 649,
    originalPrice: 699,
    rating: 4.96,
    reviewsCount: 84,
    inStock: true,
    stockCount: 23,
    badge: '16-CORE WORKHORSE',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '16 Cores / 32 Threads, 5.7 GHz Max Boost, 80MB Cache, AM5 Socket, PCIe 5.0, 170W TDP.',
    fullDesc: 'AMD’s flagship Zen 5 desktop processor. Delivers titanic multi-threaded throughput for heavy compilers, 3D render pipelines, and video transcoding alongside exceptional IPC gains for high-framerate gaming.',
    specs: [
      { label: 'Cores / Threads', value: '16 Cores / 32 Threads' },
      { label: 'Base Clock', value: '4.3 GHz' },
      { label: 'Max Boost Clock', value: 'Up to 5.7 GHz' },
      { label: 'Total Cache', value: '80MB (L2 + L3)' },
      { label: 'Socket', value: 'Socket AM5' },
      { label: 'Default TDP', value: '170 Watts' },
      { label: 'Memory Support', value: 'DDR5 (Dual Channel)' },
      { label: 'PCIe Lanes', value: 'PCIe 5.0 (28 Lanes total)' }
    ],
    compatibility: {
      socket: 'AM5',
      ramType: 'DDR5',
      tdpWatts: 170
    },
    reviews: []
  },
  {
    id: 'cpu-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    category: 'cpu',
    price: 449,
    originalPrice: 499,
    rating: 4.98,
    reviewsCount: 162,
    inStock: true,
    stockCount: 31,
    featured: true,
    badge: 'BEST GAMING CPU',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '8 Cores / 16 Threads, 5.0 GHz Boost, 104MB 3D V-Cache, AM5 Socket, 120W TDP.',
    fullDesc: 'The undisputed champion of pure gaming performance. Packed with 96MB of vertically stacked 3D V-Cache that keeps frame times remarkably consistent in CPU-bound esports and simulation titles.',
    specs: [
      { label: 'Cores / Threads', value: '8 Cores / 16 Threads' },
      { label: 'Boost Clock', value: '5.0 GHz' },
      { label: 'L3 Cache', value: '96MB 3D V-Cache (104MB Total)' },
      { label: 'Socket', value: 'Socket AM5' },
      { label: 'Default TDP', value: '120 Watts' },
      { label: 'Memory', value: 'DDR5-6000 CL30 Sweet Spot' }
    ],
    compatibility: {
      socket: 'AM5',
      ramType: 'DDR5',
      tdpWatts: 120
    },
    reviews: []
  },
  {
    id: 'cpu-ultra-285k',
    name: 'Intel Core Ultra 9 285K',
    brand: 'INTEL',
    category: 'cpu',
    price: 629,
    originalPrice: 659,
    rating: 4.91,
    reviewsCount: 42,
    inStock: true,
    stockCount: 18,
    badge: 'ARROW LAKE UNLOCKED',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '24 Cores (8P + 16E), 5.7 GHz Boost, LGA1851 Socket, Dedicated NPU, 125W Base / 250W MTP.',
    fullDesc: 'Intel’s all-new Arrow Lake architecture featuring Skymont and Lion Cove cores on TSMC 3nm packaging. Built-in 13 TOPS AI NPU engine and class-leading thermal efficiency reductions.',
    specs: [
      { label: 'Core Configuration', value: '24 Cores (8 Performance + 16 Efficient)' },
      { label: 'Max Turbo Frequency', value: '5.7 GHz' },
      { label: 'Socket', value: 'LGA1851' },
      { label: 'Base / Boost Power', value: '125W / 250W Maximum Turbo' },
      { label: 'Integrated AI', value: 'Intel AI Boost NPU (13 TOPS)' },
      { label: 'Memory Support', value: 'DDR5-6400 (CUDIMM Ready)' }
    ],
    compatibility: {
      socket: 'LGA1851',
      ramType: 'DDR5',
      tdpWatts: 250
    },
    reviews: []
  },

  // ================= GRAPHICS CARDS (GPUs) =================
  {
    id: 'gpu-rtx-5090',
    name: 'NVIDIA GeForce RTX 5090 32GB Founders',
    brand: 'NVIDIA',
    category: 'gpu',
    price: 1999,
    originalPrice: 2099,
    rating: 4.97,
    reviewsCount: 48,
    inStock: true,
    stockCount: 6,
    featured: true,
    badge: 'BLACKWELL TITAN',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '32GB GDDR7, 512-bit bus, 28,000 CUDA Cores, DLSS 4 with Multi-Frame Generation, 600W TGP.',
    fullDesc: 'The definitive graphics card of this decade. Built on NVIDIA Blackwell architecture with 32GB of blazing GDDR7 memory operating at 28 Gbps. Provides uninterrupted real-time full path tracing at native 4K resolutions and double-precision AI compute.',
    specs: [
      { label: 'VRAM', value: '32GB GDDR7 (512-bit, 1,792 GB/s Bandwidth)' },
      { label: 'CUDA Cores', value: '28,160 Cores' },
      { label: 'Tensor Cores', value: '5th Generation Blackwell AI Cores' },
      { label: 'Interface', value: 'PCIe 5.0 x16' },
      { label: 'Power Consumption', value: '600W TGP (12V-2x6 Power Connector)' },
      { label: 'Recommended PSU', value: '1000W - 1200W minimum' },
      { label: 'Card Dimensions', value: '336mm length, 3.5-slot thickness' },
      { label: 'Outputs', value: '3x DisplayPort 2.1a (UHBR20), 1x HDMI 2.1b' }
    ],
    compatibility: {
      tdpWatts: 600,
      gpuLengthMm: 336
    },
    benchmarks: [
      { game: 'Cyberpunk 2077 (4K Path Tracing Ultra)', fps: 125, resolution: '4K', preset: 'Ultra RT + DLSS 4' },
      { game: 'Alan Wake 2 (4K Full Path Traced)', fps: 110, resolution: '4K', preset: 'Maximum' }
    ],
    reviews: []
  },
  {
    id: 'gpu-rtx-5080',
    name: 'ASUS ROG Strix GeForce RTX 5080 16GB OC',
    brand: 'ASUS ROG',
    category: 'gpu',
    price: 1249,
    originalPrice: 1299,
    rating: 4.93,
    reviewsCount: 36,
    inStock: true,
    stockCount: 11,
    badge: 'OVERCLOCKED BEAST',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '16GB GDDR7, Axial-tech fans, Diecast metal shroud, Dual BIOS, 400W TGP.',
    fullDesc: 'Extreme factory overclocked RTX 5080 with a gargantuan 3.2-slot heatsink, vapor chamber contact plate, and magnetic Aura Sync RGB lighting.',
    specs: [
      { label: 'VRAM', value: '16GB GDDR7 (256-bit bus)' },
      { label: 'Boost Clock', value: '2,680 MHz (OC Mode)' },
      { label: 'Interface', value: 'PCIe 5.0 x16' },
      { label: 'TGP', value: '400W' },
      { label: 'Length', value: '357mm' }
    ],
    compatibility: {
      tdpWatts: 400,
      gpuLengthMm: 357
    },
    reviews: []
  },
  {
    id: 'gpu-rtx-4070ti-super',
    name: 'MSI Gaming X Slim RTX 4070 Ti Super 16GB',
    brand: 'MSI',
    category: 'gpu',
    price: 849,
    originalPrice: 899,
    rating: 4.86,
    reviewsCount: 71,
    inStock: true,
    stockCount: 19,
    badge: '1440P SWEET SPOT',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '16GB GDDR6X (256-bit), TRI FROZR 3 thermal design, TORX Fan 5.0, 285W TDP.',
    fullDesc: 'The definitive 1440p and entry 4K graphics card with generous 16GB VRAM buffer. Slim 2.5-slot profile allows easy installation into compact chassis.',
    specs: [
      { label: 'VRAM', value: '16GB GDDR6X' },
      { label: 'CUDA Cores', value: '8,448' },
      { label: 'Power Consumption', value: '285 Watts' },
      { label: 'Length', value: '307mm' }
    ],
    compatibility: {
      tdpWatts: 285,
      gpuLengthMm: 307
    },
    reviews: []
  },

  // ================= MOTHERBOARDS =================
  {
    id: 'mb-rog-z890',
    name: 'ASUS ROG Maximus Z890 Hero',
    brand: 'ASUS ROG',
    category: 'motherboard',
    price: 699,
    originalPrice: 749,
    rating: 4.91,
    reviewsCount: 22,
    inStock: true,
    stockCount: 8,
    badge: 'ENTHUSIAST FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'LGA1851 Socket, 20+1+2 Power Stages, DDR5-8800+ MT/s, Dual Thunderbolt 4, WiFi 7, 5x M.2 Slots.',
    fullDesc: 'Engineered specifically for Intel Core Ultra 200S Series processors. Features massive VRM heatsinks with integrated heatpipes, PCIe 5.0 M.2 slot with quick-release latches, and Polymo lighting on the I/O cover.',
    specs: [
      { label: 'Socket', value: 'Intel LGA1851' },
      { label: 'Form Factor', value: 'ATX (30.5 cm x 24.4 cm)' },
      { label: 'Memory Slots', value: '4x DDR5 DIMMs (Up to 192GB, 8800+ MT/s)' },
      { label: 'PCIe Slots', value: '1x PCIe 5.0 x16, 1x PCIe 4.0 x16' },
      { label: 'M.2 Slots', value: '3x PCIe 5.0 M.2 + 2x PCIe 4.0 M.2' },
      { label: 'Networking', value: 'Intel 5Gb Ethernet + Intel Wi-Fi 7 (320MHz)' },
      { label: 'Audio', value: 'ROG SupremeFX ALC4082 with ESS ES9218 Quad-DAC' }
    ],
    compatibility: {
      socket: 'LGA1851',
      ramType: 'DDR5',
      formFactor: 'ATX'
    },
    reviews: []
  },
  {
    id: 'mb-msi-x870e',
    name: 'MSI MAG X870 Tomahawk WiFi',
    brand: 'MSI',
    category: 'motherboard',
    price: 329,
    originalPrice: 359,
    rating: 4.89,
    reviewsCount: 45,
    inStock: true,
    stockCount: 16,
    featured: true,
    badge: 'BEST AM5 BOARD',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'AM5 Socket for Ryzen 9000/7000, 14+2+1 Duet Rail VRM, PCIe 5.0 x16, Wi-Fi 7, 5G LAN, Dual USB4 40Gbps.',
    fullDesc: 'Rock-solid reliability and future-proof AM5 connectivity. Features extended heatsinks with 7W/mK thermal pads, tool-free EZ M.2 Shield Frozr, and pre-installed I/O shield.',
    specs: [
      { label: 'Socket', value: 'AMD Socket AM5' },
      { label: 'Form Factor', value: 'ATX' },
      { label: 'Memory', value: '4x DDR5 DIMMs (Up to 256GB, 8400+ OC)' },
      { label: 'USB4', value: '2x 40Gbps Type-C ports with 27W Fast Charging' },
      { label: 'Networking', value: 'Wi-Fi 7 + Realtek 5GbE LAN' }
    ],
    compatibility: {
      socket: 'AM5',
      ramType: 'DDR5',
      formFactor: 'ATX'
    },
    reviews: []
  },
  {
    id: 'mb-strix-itx',
    name: 'ASUS ROG Strix B650E-I Gaming WiFi',
    brand: 'ASUS ROG',
    category: 'motherboard',
    price: 339,
    originalPrice: 369,
    rating: 4.84,
    reviewsCount: 31,
    inStock: true,
    stockCount: 7,
    badge: 'MINI-ITX COMPACT',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Socket AM5 Mini-ITX, PCIe 5.0 x16, 10+2 Power Stages, DDR5-6400+, 2x M.2 Slots with active VRM fan.',
    fullDesc: 'Engineered for high-density small-form-factor builds. Features PCIe 5.0 graphics slot, dedicated VRM heatpipe and fan, and ROG Hive audio/diagnostic module.',
    specs: [
      { label: 'Socket', value: 'AMD AM5' },
      { label: 'Form Factor', value: 'Mini-ITX (17.0 cm x 17.0 cm)' },
      { label: 'Memory', value: '2x DDR5 DIMMs (Up to 96GB)' }
    ],
    compatibility: {
      socket: 'AM5',
      ramType: 'DDR5',
      formFactor: 'Mini-ITX'
    },
    reviews: []
  },

  // ================= MEMORY (RAM) =================
  {
    id: 'ram-dominator-64',
    name: 'Corsair Dominator Titanium RGB 64GB (2x32GB) DDR5-6400',
    brand: 'CORSAIR',
    category: 'ram',
    price: 319,
    originalPrice: 349,
    rating: 4.94,
    reviewsCount: 39,
    inStock: true,
    stockCount: 20,
    badge: 'TITANIUM PREMIUM',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'DDR5 6400MHz, CL32-40-40-84, 1.40V, Intel XMP 3.0 & AMD EXPO, Custom DHX Cooling, Swappable Top Bars.',
    fullDesc: 'Forged aluminum heatspreaders with patented DHX cooling technology. 11 individually addressable CAPELLIX RGB LEDs per module with precision temperature monitoring inside iCUE software.',
    specs: [
      { label: 'Capacity', value: '64GB Kit (2x 32GB)' },
      { label: 'Speed', value: 'DDR5-6400 MT/s' },
      { label: 'Timings', value: 'CL32-40-40-84' },
      { label: 'Voltage', value: '1.40V' },
      { label: 'Profiles', value: 'Intel XMP 3.0 & AMD EXPO Dual Profile Support' }
    ],
    compatibility: {
      ramType: 'DDR5'
    },
    reviews: []
  },
  {
    id: 'ram-trident-32',
    name: 'G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000 CL30',
    brand: 'G.SKILL',
    category: 'ram',
    price: 139,
    originalPrice: 159,
    rating: 4.96,
    reviewsCount: 118,
    inStock: true,
    stockCount: 40,
    featured: true,
    badge: 'LOW LATENCY SWEET SPOT',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'DDR5 6000MHz, Ultra-low CL30-38-38-96, 1.35V, AMD EXPO certified, Sleek Matte Black.',
    fullDesc: 'The gold standard memory kit for AMD Ryzen AM5 platforms. Hand-screened memory ICs tuned for 1:1 Infinity Fabric ratio stability.',
    specs: [
      { label: 'Capacity', value: '32GB (2x 16GB)' },
      { label: 'Speed', value: 'DDR5-6000' },
      { label: 'Latency', value: 'CL30-38-38-96' }
    ],
    compatibility: {
      ramType: 'DDR5'
    },
    reviews: []
  },

  // ================= STORAGE (SSDs) =================
  {
    id: 'ssd-crucial-t705-2tb',
    name: 'Crucial T705 2TB PCIe Gen5 NVMe with Heatsink',
    brand: 'CRUCIAL',
    category: 'storage',
    price: 279,
    originalPrice: 319,
    rating: 4.91,
    reviewsCount: 35,
    inStock: true,
    stockCount: 14,
    badge: '14,500 MB/s READ',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Sequential reads up to 14,500 MB/s, writes up to 12,700 MB/s, Micron 232-layer 3D TLC NAND, DirectStorage.',
    fullDesc: 'Next-generation PCIe 5.0 throughput designed for instantaneous game level loads and uncompressed 8K video timelines. Premium copper-core aluminum heatsink prevents thermal throttling.',
    specs: [
      { label: 'Sequential Read', value: 'Up to 14,500 MB/s' },
      { label: 'Sequential Write', value: 'Up to 12,700 MB/s' },
      { label: 'Interface', value: 'PCIe Gen5 x4, NVMe 2.0' },
      { label: 'Endurance', value: '1,200 TBW' }
    ],
    reviews: []
  },
  {
    id: 'ssd-samsung-990pro-4tb',
    name: 'Samsung 990 PRO 4TB PCIe 4.0 NVMe',
    brand: 'SAMSUNG',
    category: 'storage',
    price: 349,
    originalPrice: 389,
    rating: 4.97,
    reviewsCount: 92,
    inStock: true,
    stockCount: 25,
    featured: true,
    badge: 'LEGENDARY RELIABILITY',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '7,450 MB/s Read, 6,900 MB/s Write, Samsung Pascal Controller, 4GB LPDDR4 DRAM Cache, 2,400 TBW.',
    fullDesc: 'The king of PCIe 4.0 reliability and power efficiency. Massive 4TB storage capacity holds dozens of modern AAA titles, RAW footage libraries, and Docker development environments.',
    specs: [
      { label: 'Capacity', value: '4,000 GB (4TB)' },
      { label: 'Read Speed', value: '7,450 MB/s' },
      { label: 'Write Speed', value: '6,900 MB/s' },
      { label: 'Endurance', value: '2,400 TBW (5-Year Warranty)' }
    ],
    reviews: []
  },

  // ================= COOLING =================
  {
    id: 'cool-kraken-360',
    name: 'NZXT Kraken Elite 360 RGB LCD AIO',
    brand: 'NZXT',
    category: 'cooling',
    price: 289,
    originalPrice: 319,
    rating: 4.88,
    reviewsCount: 57,
    inStock: true,
    stockCount: 15,
    badge: 'IPS DISPLAY CAP',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '360mm Radiator, 2.36" Wide-Angle 640x640 IPS Display 60Hz, Asetek 7th Gen V2 Pump, 3x F120 RGB Core Fans.',
    fullDesc: 'Showcase system temperatures, GPU clocks, custom animated GIFs, or Spotify track art directly onto your CPU water block. Ultra-dense micro-skived copper fin cold plate.',
    specs: [
      { label: 'Radiator Size', value: '360mm (394 x 121 x 27mm)' },
      { label: 'Pump Speed', value: '800 – 2,800 ± 300 RPM' },
      { label: 'Screen', value: '2.36" Diameter 640x640 60Hz 690 nits IPS' },
      { label: 'Sockets', value: 'Intel LGA 1851/1700/1200; AMD AM5/AM4' }
    ],
    reviews: []
  },
  {
    id: 'cool-arctic-360',
    name: 'ARCTIC Liquid Freezer III 360 Black',
    brand: 'ARCTIC',
    category: 'cooling',
    price: 119,
    originalPrice: 139,
    rating: 4.95,
    reviewsCount: 78,
    inStock: true,
    stockCount: 22,
    badge: 'PURE PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '38mm Extra-thick 360mm Radiator, Integrated Motherboard VRM cooling fan, Offset mounting for AM5.',
    fullDesc: 'The champion of thermal benchmark tests worldwide. Features a 38mm deep radiator that holds 35% more liquid volume than standard AIOs, accompanied by an active centrifugal VRM cooling fan.',
    specs: [
      { label: 'Thickness', value: '38mm Radiator' },
      { label: 'Special Feature', value: 'Integrated VRM & M.2 cooling fan' },
      { label: 'Fans', value: '3x P12 PWM PST pressure-optimized' }
    ],
    reviews: []
  },

  // ================= CASES =================
  {
    id: 'case-lianli-o11',
    name: 'Lian Li O11 Vision Chrome Panoramic Glass',
    brand: 'LIAN LI',
    category: 'case',
    price: 159,
    originalPrice: 179,
    rating: 4.92,
    reviewsCount: 63,
    inStock: true,
    stockCount: 17,
    featured: true,
    badge: '3-SIDED GLASS',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '3-sided seamless tempered glass, Dual chamber design, Supports up to 2x 360mm radiators, 455mm GPU clearance.',
    fullDesc: 'Created in collaboration with PC Master Race (PCMR). Three seamless tempered glass panels without corner pillars provide an unobstructed panoramic view of your internal hardware.',
    specs: [
      { label: 'Chassis Type', value: 'Dual-Chamber Mid-Tower' },
      { label: 'Supported Motherboards', value: 'E-ATX, ATX, Micro-ATX, Mini-ITX' },
      { label: 'GPU Clearance', value: 'Up to 455mm length' },
      { label: 'CPU Cooler Clearance', value: 'Up to 167mm' },
      { label: 'PSU Clearance', value: 'Up to 220mm ATX' }
    ],
    compatibility: {
      formFactor: 'ATX',
      maxGpuLengthMm: 455,
      coolerClearanceMm: 167
    },
    reviews: []
  },
  {
    id: 'case-fractal-north',
    name: 'Fractal Design North Charcoal Black (Walnut)',
    brand: 'FRACTAL',
    category: 'case',
    price: 149,
    originalPrice: 169,
    rating: 4.97,
    reviewsCount: 88,
    inStock: true,
    stockCount: 19,
    badge: 'SCANDINAVIAN DESIGN',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Real American Walnut wood front slats, Brass power button, Tinted glass side panel, 355mm GPU clearance.',
    fullDesc: 'Transforms the gaming PC into an organic design statement for living spaces and design studios. Real FSC-certified walnut wood front accompanied by brass detailing and mesh airflow channels.',
    specs: [
      { label: 'Front Panel', value: 'Solid FSC-Certified Walnut Slats' },
      { label: 'Motherboards', value: 'ATX, mATX, ITX' },
      { label: 'GPU Clearance', value: 'Up to 355mm' }
    ],
    compatibility: {
      formFactor: 'ATX',
      maxGpuLengthMm: 355,
      coolerClearanceMm: 170
    },
    reviews: []
  },

  // ================= POWER SUPPLIES (PSUs) =================
  {
    id: 'psu-seasonic-1200',
    name: 'Seasonic Vertex GX-1200 ATX 3.0 1200W',
    brand: 'SEASONIC',
    category: 'psu',
    price: 249,
    originalPrice: 279,
    rating: 4.96,
    reviewsCount: 33,
    inStock: true,
    stockCount: 12,
    badge: '12-YEAR WARRANTY',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '1200W, 80 PLUS Gold, Native PCIe 5.0 12V-2x6 cable, 135mm Fluid Dynamic Bearing Fan, Hybrid Silent mode.',
    fullDesc: 'The gold standard in clean, ripple-free power delivery. Fully ATX 3.0 and PCIe 5.0 compliant with native 12V-2x6 600W cable for effortless power delivery to RTX 5090 and 5080 series.',
    specs: [
      { label: 'Wattage Output', value: '1200 Watts' },
      { label: 'Efficiency Rating', value: '80 PLUS Gold & Cybenetics Platinum' },
      { label: 'Standard', value: 'ATX 3.0 / PCIe 5.0 Ready' },
      { label: 'Warranty', value: '12 Years Manufacturer Direct' }
    ],
    compatibility: {
      wattageOutput: 1200
    },
    reviews: []
  },
  {
    id: 'psu-corsair-1000',
    name: 'Corsair RM1000x Shift ATX 3.0 1000W',
    brand: 'CORSAIR',
    category: 'psu',
    price: 199,
    originalPrice: 219,
    rating: 4.91,
    reviewsCount: 54,
    inStock: true,
    stockCount: 21,
    badge: 'SIDE-MOUNTED CABLES',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '1000W, 80 PLUS Gold, Innovative side-facing modular connectors for effortless cable plugging.',
    fullDesc: 'Revolutionary side-mounted interface panel gives you clear visibility and easy access when routing cables in tight enclosures.',
    specs: [
      { label: 'Wattage Output', value: '1000 Watts' },
      { label: 'Efficiency', value: '80 PLUS Gold' },
      { label: 'Connector Type', value: 'Micro-fit Side Connector' }
    ],
    compatibility: {
      wattageOutput: 1000
    },
    reviews: []
  },

  // ================= MONITORS & PERIPHERALS =================
  {
    id: 'mon-samsung-g9',
    name: 'Samsung Odyssey OLED G9 49" Curved 240Hz',
    brand: 'SAMSUNG',
    category: 'monitors',
    price: 1299,
    originalPrice: 1599,
    rating: 4.88,
    reviewsCount: 46,
    inStock: true,
    stockCount: 8,
    featured: true,
    badge: '32:9 DUAL QHD',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '49" OLED 1800R Curved, Dual QHD (5120x1440), 240Hz, 0.03ms (GtG), Neo Quantum Processor Pro, CoreSync RGB.',
    fullDesc: 'Immerse your entire peripheral vision into ultra-vibrant QD-OLED blacks and vivid color depths. Equivalent to two 27-inch QHD monitors side by side without any center bezel seam.',
    specs: [
      { label: 'Screen Size & Aspect', value: '49.0" Curved (32:9 Aspect Ratio)' },
      { label: 'Resolution', value: 'Dual QHD (5,120 x 1,440 pixels)' },
      { label: 'Refresh Rate', value: '240 Hz' },
      { label: 'Response Time', value: '0.03ms (GtG)' },
      { label: 'Panel Type', value: 'Samsung QD-OLED' }
    ],
    reviews: []
  },
  {
    id: 'peri-wooting-60he',
    name: 'Wooting 60HE+ Hall Effect Analog Keyboard',
    brand: 'WOOTING',
    category: 'peripherals',
    price: 189,
    originalPrice: 209,
    rating: 4.99,
    reviewsCount: 140,
    inStock: true,
    stockCount: 15,
    badge: 'RAPID TRIGGER 0.1mm',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Lekker Hall Effect Magnetic Switches, 0.1mm Rapid Trigger, 8000Hz Polling Rate, Per-Key Actuation Point 0.1-4.0mm.',
    fullDesc: 'The competitive esports gold standard. Uses magnetic Hall sensors to measure precise key depth dynamically, eliminating the debounce delay of mechanical leaf contacts.',
    specs: [
      { label: 'Switches', value: 'Lekker L60 Hall Effect Magnetic' },
      { label: 'Polling Rate', value: '8000 Hz' },
      { label: 'Actuation Adjustability', value: '0.1mm to 4.0mm per key' },
      { label: 'Form Factor', value: '60% Ultra-Compact' }
    ],
    reviews: []
  },
  {
    id: 'peri-superlight-2',
    name: 'Logitech G Pro X Superlight 2 DEX Wireless',
    brand: 'LOGITECH G',
    category: 'peripherals',
    price: 159,
    originalPrice: 179,
    rating: 4.93,
    reviewsCount: 88,
    inStock: true,
    stockCount: 28,
    badge: '60 GRAMS LIGHTWEIGHT',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '60g Featherweight, HERO 2 44,000 DPI Sensor, LIGHTFORCE Hybrid Optical-Mechanical Switches, 8000Hz wireless polling.',
    fullDesc: 'Ergonomically sculpted right-handed silhouette engineered alongside the world’s tier-one Counter-Strike and Valorant professionals. Zero smoothing or acceleration.',
    specs: [
      { label: 'Weight', value: '60 grams' },
      { label: 'Sensor', value: 'HERO 2 (44,000 DPI, 888 IPS, 88G)' },
      { label: 'Battery Life', value: 'Up to 95 hours continuous motion' }
    ],
    reviews: []
  },
  {
    id: 'peri-zebronics-multimedia-rgb',
    name: 'Zebronics Gaming Multimedia Ergonomic Multicolor Keyboard',
    brand: 'ZEBRONICS',
    category: 'peripherals',
    price: 39,
    originalPrice: 49,
    rating: 4.8,
    reviewsCount: 34,
    inStock: true,
    stockCount: 45,
    badge: 'PROJECT KEYBOARD',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Multimedia shortcut keys, ergonomic comfort wrist profile, dynamic multicolor backlighting.',
    fullDesc: 'Ergonomically engineered multimedia gaming keyboard with vibrant multi-color LED illumination, dedicated hotkeys for audio and productivity, and responsive tactile switch action.',
    externalUrl: 'https://www.amazon.in/Zebronics-Keyboard-Multimedia-Ergonomic-Multicolor/dp/B0GFVBSB2C?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AJ6SIZC8YQDZX&th=1',
    projectLink: 'https://www.amazon.in/Zebronics-Keyboard-Multimedia-Ergonomic-Multicolor/dp/B0GFVBSB2C?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AJ6SIZC8YQDZX&th=1',
    specs: [
      { label: 'Lighting', value: 'Multicolor RGB LED Backlit' },
      { label: 'Interface', value: 'USB Gold Plated Braided Cable' },
      { label: 'Multimedia Controls', value: '12 Dedicated Hotkeys' },
      { label: 'Layout', value: 'Full-Size Ergonomic Layout' }
    ],
    reviews: [
      {
        id: 'rev-zeb-1',
        author: 'Arun K.',
        verifiedPurchase: true,
        rating: 5,
        date: '2026-09-18',
        title: 'Great budget ergonomic keyboard with vibrant LEDs',
        comment: 'Responsive key presses, solid multimedia controls, and looks great alongside my custom PC build.'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Hardware' },
  { id: 'desktops', label: 'Pre-Built Rigs' },
  { id: 'laptops', label: 'Gaming Laptops' },
  { id: 'cpu', label: 'Processors (CPUs)' },
  { id: 'gpu', label: 'Graphics Cards (GPUs)' },
  { id: 'motherboard', label: 'Motherboards' },
  { id: 'ram', label: 'Memory (RAM)' },
  { id: 'storage', label: 'Solid State Drives' },
  { id: 'cooling', label: 'Liquid Cooling & AIO' },
  { id: 'case', label: 'Chassis & Cases' },
  { id: 'psu', label: 'Power Supplies' },
  { id: 'monitors', label: 'Monitors' },
  { id: 'peripherals', label: 'Peripherals' }
];

export const PRECONFIGURED_BUILDS: {
  name: string;
  tagline: string;
  targetPrice: string;
  rgbColor: string;
  parts: {
    cpuId: string;
    coolerId: string;
    mbId: string;
    ramId: string;
    gpuId: string;
    storageId: string;
    caseId: string;
    psuId: string;
  };
}[] = [
  {
    name: 'VALENCE TITAN 5090 STREAMER',
    tagline: 'Unrestricted 4K 240Hz, Local AI Models, 0 Frame Drops',
    targetPrice: '$4,543',
    rgbColor: '#06b6d4', // Cyan
    parts: {
      cpuId: 'cpu-ultra-285k',
      coolerId: 'cool-kraken-360',
      mbId: 'mb-rog-z890',
      ramId: 'ram-dominator-64',
      gpuId: 'gpu-rtx-5090',
      storageId: 'ssd-crucial-t705-2tb',
      caseId: 'case-lianli-o11',
      psuId: 'psu-seasonic-1200'
    }
  },
  {
    name: 'ESPORTS PURE X3D BATTLE RIG',
    tagline: 'Maximum 1% Low FPS in Counter-Strike 2 & Valorant',
    targetPrice: '$2,783',
    rgbColor: '#f59e0b', // Amber
    parts: {
      cpuId: 'cpu-7800x3d',
      coolerId: 'cool-arctic-360',
      mbId: 'mb-msi-x870e',
      ramId: 'ram-trident-32',
      gpuId: 'gpu-rtx-5080',
      storageId: 'ssd-samsung-990pro-4tb',
      caseId: 'case-fractal-north',
      psuId: 'psu-corsair-1000'
    }
  },
  {
    name: 'STEALTH CREATOR WORKSTATION',
    tagline: 'Silent 16-Core Zen 5 Architecture for 3D & 8K Video',
    targetPrice: '$3,184',
    rgbColor: '#10b981', // Emerald
    parts: {
      cpuId: 'cpu-9950x',
      coolerId: 'cool-arctic-360',
      mbId: 'mb-msi-x870e',
      ramId: 'ram-dominator-64',
      gpuId: 'gpu-rtx-4070ti-super',
      storageId: 'ssd-samsung-990pro-4tb',
      caseId: 'case-fractal-north',
      psuId: 'psu-seasonic-1200'
    }
  }
];
