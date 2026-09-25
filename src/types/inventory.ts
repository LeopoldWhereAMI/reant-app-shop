export type Category = "gas_tools" | "electric_tools";

export type Status = "available" | "rented" | "maintenance";

export type InventoryItem = {
  id: string;
  name: string;
  category: Category;
  daily_price: number;
  status: Status;
  serial_number: string;
  image_url?: string | null;
};
