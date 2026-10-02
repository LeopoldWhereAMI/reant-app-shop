import { screen, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolCard } from "@/components/Catalog/ui/ToolCard";
import { createInventoryItem } from "@/tests/helpers/inventory";

describe("ToolCard", () => {
  it("рендерит название инструмента", () => {
    const item = createInventoryItem();

    render(<ToolCard item={item} />);

    expect(screen.getByText("Бензопила")).toBeInTheDocument();
  });

  it("показывает статус Доступен для доступного инструмента", () => {
    const item = createInventoryItem({
      status: "available",
    });

    render(<ToolCard item={item} />);

    expect(screen.getByText("Доступен")).toBeInTheDocument();
  });

  it("показывает статус Недоступен для недоступного инструмента", () => {
    const item = createInventoryItem({
      status: "rented",
    });

    render(<ToolCard item={item} />);

    expect(screen.getByText("Недоступен")).toBeInTheDocument();
  });

  it("показывает категорию Электроинструмент для category: electric_tools", () => {
    const item = createInventoryItem({
      category: "electric_tools",
    });

    render(<ToolCard item={item} />);

    expect(screen.getByText("Электроинструмент")).toBeInTheDocument();
  });

  it("показывает категорию Бензиновый инструмент для category: gas_tools", () => {
    const item = createInventoryItem();

    render(<ToolCard item={item} />);

    expect(screen.getByText("Бензиновый инструмент")).toBeInTheDocument();
  });

  it("показывает изображение инструмента при наличии загруженной картинки", () => {
    const item = createInventoryItem({
      image_url: "/test-image.webp",
    });

    render(<ToolCard item={item} />);

    expect(screen.getByAltText(item.name)).toBeInTheDocument();
  });

  it("показывает текст Нет изображения  при отсутствии загруженной картинки", () => {
    const item = createInventoryItem();

    render(<ToolCard item={item} />);

    expect(screen.getByText("Нет изображения")).toBeInTheDocument();
  });

  it("показывает стоимость аренды", () => {
    const item = createInventoryItem({
      daily_price: 1500,
    });

    render(<ToolCard item={item} />);

    expect(screen.getByText(/1500 ₽/)).toBeInTheDocument();
  });

  it("содержит id инструмента в href ссылки", () => {
    const item = createInventoryItem();

    render(<ToolCard item={item} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/catalog/${item.id}`,
    );
  });
});
