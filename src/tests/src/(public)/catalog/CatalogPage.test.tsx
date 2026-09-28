import CatalogPage from "@/app/(public)/catalog/page";
import { screen, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetInventory } = vi.hoisted(() => ({
  mockGetInventory: vi.fn(), // пустая функция-шпион, ничего не делает
}));

// vi.mock говорит Vitest: «когда кто-то импортирует "@/lib/api/inventory", верни НЕ настоящий модуль,
// а объект { getInventory: mockGetInventory }». В коде компонента import { getInventory } from "@/lib/api/inventory"
// получит именно этот мок.
vi.mock("@/lib/api/inventory", () => ({
  getInventory: mockGetInventory,
}));

const { mockCatalogList } = vi.hoisted(() => ({
  mockCatalogList: vi.fn(),
}));

vi.mock("@/components/Catalog/CatalogList", () => ({
  default: mockCatalogList,
}));

describe("CatalogPage", () => {
  beforeEach(() => {
    // mockResolvedValue — заставляем мок вернуть Promise<[]>,
    mockGetInventory.mockResolvedValue([]);
    // mockCatalogList взвращает div
    mockCatalogList.mockReturnValue(<div>Mock CatalogList</div>);
  });

  it("отображает заголовок и подзаголовок", async () => {
    const page = await CatalogPage();

    render(page);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Каталог",
    );

    expect(
      screen.getByText("Инструмент в аренду для дома, ремонта и работы"),
    ).toBeInTheDocument();
  });

  it("функция getInventory вызывается 1 раз", async () => {
    await CatalogPage();

    expect(mockGetInventory).toHaveBeenCalledTimes(1);
  });

  it("передаёт данные в CatalogList", async () => {
    const items = [
      {
        id: "1",
        name: "Бензопила",
        category: "gas_tools",
        daily_price: 1000,
        status: "available",
        serial_number: "SN-001",
        total_work_days: 0,
        purchase_price: 0,
        image_url: null,
      },
    ];

    mockGetInventory.mockResolvedValue(items);

    const page = await CatalogPage();

    render(page);

    expect(mockCatalogList).toHaveBeenCalledWith({ items }, undefined);
  });
});
