import { InventoryItem } from "@/types/inventory";

function getApiUrl(): string {
  const url = process.env.RENT_APP_API_URL;
  if (!url) throw new Error("RENT_APP_API_URL не задан");
  return url;
}

export async function getInventory(): Promise<InventoryItem[]> {
  const apiUrl = getApiUrl();

  try {
    const response = await fetch(`${apiUrl}/api/public/inventory`, {
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
        ? new URL(item.image_url, apiUrl).toString()
        : null,
    }));
  } catch (error) {
    console.error("[API] Ошибка загрузки инвентаря:", error);

    throw new Error("Не удалось загрузить список инструментов", {
      cause: error,
    });
  }
}

export async function getInventoryItem(id: string) {
  const all = await getInventory();
  return all.find((item) => item.id === id) ?? null;
}
