import { getInventory, getInventoryItem } from "@/lib/api/inventory";
import { InventoryItem } from "@/types/inventory";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
});

const createInventoryItem = (
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

const mockInventoryResponse = (data: InventoryItem[]) => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data }),
  });
};

describe("getInventory", () => {
  it("выбрасывает ошибку, если RENT_APP_API_URL не задан", async () => {
    try {
      vi.stubEnv("RENT_APP_API_URL", undefined);

      await expect(getInventory()).rejects.toThrow("RENT_APP_API_URL не задан");
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("возвращает список инструментов", async () => {
    mockInventoryResponse([
      createInventoryItem({
        image_url: "/api/images/inventory/test.webp",
      }),
    ]);

    const result = await getInventory();

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      id: "1",
      name: "Бензопила",
      category: "gas_tools",
      daily_price: 1000,
      status: "available",
      serial_number: "SN-001",
      total_work_days: 0,
      purchase_price: 0,
      image_url: "https://example.com/api/images/inventory/test.webp",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://example.com/api/public/inventory",
      {
        next: {
          revalidate: 60,
        },
      },
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("выбрасывает ошибку, если API вернул ошибку", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getInventory()).rejects.toThrow(
      "Не удалось загрузить список инструментов",
    );
  });

  it("выбрасывает ошибку при некорректном формате данных", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: "не массив",
      }),
    });

    await expect(getInventory()).rejects.toThrow(
      "Не удалось загрузить список инструментов",
    );
  });

  it("возвращает null для image_url, если изображения нет", async () => {
    mockInventoryResponse([
      createInventoryItem({
        id: "2",
        name: "Перфоратор",
        category: "electric_tools",
        daily_price: 800,
        serial_number: "SN-002",
      }),
    ]);
    const result = await getInventory();

    expect(result[0].image_url).toBeNull();
  });
});

describe("getInventoryItem", () => {
  it("возвращает инструмент по id", async () => {
    const expectedItem = createInventoryItem({
      id: "2",
      name: "Перфоратор",
      category: "electric_tools",
      daily_price: 800,
      serial_number: "SN-002",
    });

    mockInventoryResponse([createInventoryItem(), expectedItem]);

    const result = await getInventoryItem("2");

    expect(result).toEqual(expectedItem);
  });

  it("возвращает null, если инструмент не найден", async () => {
    mockInventoryResponse([createInventoryItem()]);

    const result = await getInventoryItem("999");

    expect(result).toBeNull();
  });
});
