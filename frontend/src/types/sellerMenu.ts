export type SellerMenuStatus = "PUBLISHED" | "DRAFT" | "HIDDEN";
export interface SellerMenuImage {
  id: number;
  url: string;
  name: string;
  isCover: boolean;
  displayOrder: number;
}
export interface SellerMenu {
  id: number;
  version: number;
  name: string;
  category: string;
  unitPrice: string;
  minGuests: number;
  maxGuests: number;
  dishItems: string;
  description: string;
  imageUrl: string | null;
  status: SellerMenuStatus;
  images: SellerMenuImage[];
}
export interface MenuDraftImage {
  key: string;
  name: string;
  url: string;
  file?: File;
}
export interface SellerMenuInput {
  name: string;
  category: string;
  unitPrice: string;
  minGuests: number;
  maxGuests: number;
  dishItems: string;
  description: string;
  status: SellerMenuStatus;
  version?: number;
  imageKeys: string[];
  coverKey: string;
}
export const sellerMenuLabels: Record<SellerMenuStatus, string> = {
  PUBLISHED: "Đang hiển thị",
  DRAFT: "Bản nháp",
  HIDDEN: "Tạm ẩn",
};
