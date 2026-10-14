export interface SellerSlot {
  id: number;
  version: number;
  serviceDate: string;
  startTime: string;
  endTime: string;
  available: boolean;
}
export interface SellerBooking {
  id: number;
  orderId: number;
  startsAt: string;
  endsAt: string;
}
export interface SellerSchedule {
  slots: SellerSlot[];
  bookings: SellerBooking[];
}
export type SellerSlotInput = Pick<
  SellerSlot,
  "serviceDate" | "startTime" | "endTime" | "available"
>;
