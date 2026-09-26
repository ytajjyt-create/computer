export type ProductCategory =
  | 'all'
  | 'desktops'
  | 'laptops'
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'cooling'
  | 'case'
  | 'monitors'
  | 'peripherals';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Benchmark {
  game: string;
  fps: number;
  resolution: string;
  preset: string;
}

export interface CompatibilityMeta {
  socket?: 'AM5' | 'AM4' | 'LGA1851' | 'LGA1700';
  ramType?: 'DDR5' | 'DDR4';
  formFactor?: 'ATX' | 'Micro-ATX' | 'Mini-ITX' | 'E-ATX';
  tdpWatts?: number;
  wattageOutput?: number; // for PSUs
  maxGpuLengthMm?: number; // for cases
  gpuLengthMm?: number; // for GPUs
  coolerClearanceMm?: number;
}

export interface Review {
  id: string;
  author: string;
  verifiedPurchase: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  thumbnailImages?: string[];
  badge?: string; // e.g. "FLAGSHIP", "BESTSELLER", "OVERCLOCKED"
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpec[];
  compatibility?: CompatibilityMeta;
  benchmarks?: Benchmark[];
  reviews: Review[];
  featured?: boolean;
  externalUrl?: string;
  projectLink?: string;
}

export interface CustomPCBuild {
  cpu?: Product;
  cooler?: Product;
  motherboard?: Product;
  ram?: Product;
  gpu?: Product;
  storage?: Product;
  case?: Product;
  psu?: Product;
  rgbColor?: string;
  assemblyOption?: 'diy' | 'bench_tested';
}

export interface CartItem {
  id: string; // unique item id
  product: Product;
  quantity: number;
  customBuild?: CustomPCBuild;
  warrantyTier?: 'standard' | 'extended'; // extended adds +$119
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  assemblyFee: number;
  shippingFee: number;
  tax: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: 'credit_card' | 'crypto' | 'wire' | 'apple_pay';
  status: 'processing' | 'hardware_allocated' | 'bench_testing' | 'packaged' | 'dispatched' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
