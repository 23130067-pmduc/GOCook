export interface MenuDetailImage {
  id: number;
  url: string;
  name: string;
  isCover: boolean;
  displayOrder: number;
}

export interface MenuDetail {
  id: number;
  name: string;
  category: string;
  unitPrice: string;
  minGuests: number;
  maxGuests: number;
  dishItems: string;
  description: string;
  imageUrl: string | null;
  sellerName: string;
  images: MenuDetailImage[];
}
