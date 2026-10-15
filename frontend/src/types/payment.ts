export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';

export type PaymentOrderStatus = 'PENDING' | 'CONFIRMED' | 'COOKING' | 'COMPLETED' | 'CANCELLED';

export interface CheckoutProduct {
  id: number;
  name: string;
  category: string;
  unitPrice: number;
  minGuests: number;
  maxGuests: number;
  dishItems: string | null;
  description: string | null;
  imageUrl: string | null;
  chefName: string | null;
}

export interface CheckoutRequest {
  productId: number;
  guestCount: number;
  scheduledAt: string;
  customerName: string;
  customerPhone: string;
  serviceAddress: string;
  customerNote?: string;
}

export interface CheckoutResult {
  orderCode: string;
  payUrl: string;
}

export interface PaymentStatusResult {
  orderCode: string;
  paymentStatus: PaymentStatus;
  orderStatus: PaymentOrderStatus;
  productName: string;
  chefName: string | null;
  guestCount: number;
  scheduledAt: string;
  amount: number;
  paidAt: string | null;
}
