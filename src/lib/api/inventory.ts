import { InventoryItem } from "@/types/inventory";
import prisma from "../prisma";

const API_URL = process.env.RENT_APP_API_URL;

export async function getInventory(): Promise<InventoryItem[]> {
  if (!API_URL) {
    throw new Error("RENT_APP_API_URL не задан");
  }

  try {
    const response = await fetch(`${API_URL}/api/public/inventory`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { data } = (await response.json()) as {
      data: InventoryItem[];
    };

    if (!Array.isArray(data)) {
      throw new Error("Неверный формат данных от сервера");
    }

    return data.map((item) => ({
      ...item,
      image_url: item.image_url
        ? new URL(item.image_url, API_URL).toString()
        : null,
    }));
  } catch (error) {
    console.error("[API] Ошибка загрузки инвентаря:", error);

    throw new Error("Не удалось загрузить список инструментов");
  }
}

export async function getInventoryItem(id: string) {
  if (!API_URL) {
    throw new Error("RENT_APP_API_URL не задан");
  }

  const all = await getInventory();
  return all.find((item) => item.id === id) ?? null;
}
