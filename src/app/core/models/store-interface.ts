export interface StoreModel {
  id: number;
  code: string;
  address: string;
  createdAt: Date;
  openingDate: Date;
}

export interface StoreCreateModel {
  code: string;
  address: string;
  openingDate: Date | null;
}
