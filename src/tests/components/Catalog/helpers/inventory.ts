import { InventoryItem } from "@/types/inventory";

export const createInventoryItem = (
  overrides: Partial<InventoryItem> = {},
): InventoryItem => ({
  id: "1",
  name: "Бензопила",
  category: "gas_tools",
  daily_price: 1000,
  status: "available",
  serial_number: "SN-001",
  total_work_days: 0,
  purchase_price: 0,
  image_url: null,
  ...overrides,
});
