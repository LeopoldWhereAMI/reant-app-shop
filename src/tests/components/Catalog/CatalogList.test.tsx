import CatalogList from "@/components/Catalog/ui/CatalogList";
import { createInventoryItem } from "@/tests/helpers/inventory";
import { InventoryItem } from "@/types/inventory";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

const createItems = (count: number): InventoryItem[] =>
  Array.from({ length: count }, (_, index) =>
    createInventoryItem({
      id: String(index + 1),
      name: `Инструмент ${index + 1}`,
      serial_number: `SN-${String(index + 1).padStart(3, "0")}`,
    }),
  );

describe("CatalogList", () => {
  it("показывает переданные инструменты", () => {
    const items = [
      createInventoryItem(),
      createInventoryItem({
        id: "2",
        name: "Перфоратор",
        category: "electric_tools",
        serial_number: "SN-002",
      }),
    ];

    render(<CatalogList items={items} />);

    expect(screen.getByText("Бензопила")).toBeInTheDocument();
    expect(screen.getByText("Перфоратор")).toBeInTheDocument();
  });

  it("показывает максимум 8 инструментов на странице", () => {
    const items = createItems(10);

    render(<CatalogList items={items} />);

    expect(screen.getAllByRole("article")).toHaveLength(8);

    expect(screen.getByText("Инструмент 1")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 8")).toBeInTheDocument();

    expect(screen.queryByText("Инструмент 9")).not.toBeInTheDocument();
    expect(screen.queryByText("Инструмент 10")).not.toBeInTheDocument();
  });

  it("переключается на следующую страницу", async () => {
    const items = createItems(10);
    const user = userEvent.setup();

    render(<CatalogList items={items} />);

    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" }),
    );

    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    expect(screen.getByText("Инструмент 9")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 10")).toBeInTheDocument();
  });

  it("переключается на предыдущую страницу", async () => {
    const items = createItems(10);
    const user = userEvent.setup();

    render(<CatalogList items={items} />);

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" }),
    );

    await user.click(
      screen.getByRole("button", { name: "Предыдущая страница" }),
    );

    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    expect(screen.getByText("Инструмент 1")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 8")).toBeInTheDocument();
  });

  it("не переключается дальше последней страницы", async () => {
    const items = createItems(10);
    const user = userEvent.setup();

    render(<CatalogList items={items} />);

    expect(screen.getByText("Инструмент 1")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 8")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" }),
    );

    expect(screen.getByText("Инструмент 9")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 10")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" }),
    );

    expect(screen.getByText("Инструмент 9")).toBeInTheDocument();
    expect(screen.getByText("Инструмент 10")).toBeInTheDocument();
  });
});
