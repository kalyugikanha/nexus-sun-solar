export type ProductCategory =
  | 'all'
  | 'cleaning-kits'
  | 'brushes'
  | 'cleaning-liquids'
  | 'drain-clips'
  | 'accessories'
  | 'spares';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  whatsInTheBox: string[];
  inStock: boolean;
  stockCount: number;
  badge?: 'Best Seller' | 'Top Rated' | 'Hot Deal' | 'Featured' | 'New Arrival';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'prepaid' | 'part_payment' | 'cod';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'partially_paid' | 'failed' | 'refunded';

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
  category: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAmount: number;
  remainingAmount: number;
  partPaymentPercentage?: number;
  status: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
  adminNotes?: string;
}

export interface StoreSettings {
  allowPartPayment: boolean;
  minPartPaymentPercentage: number;
  minOrderValueForPartPayment: number;
  freeShippingThreshold: number;
  shippingFee: number;
  storeName: string;
  supportPhone: string;
  supportEmail: string;
  announcement: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  inTransitOrders: number;
  deliveredOrders: number;
  averageOrderValue: number;
  partPaymentOrdersCount: number;
  prepaidOrdersCount: number;
  codOrdersCount: number;
  dueTodayCount: number;
  deliverySuccessRate: number;
  totalCollected: number;
  totalPendingBalance: number;
}
