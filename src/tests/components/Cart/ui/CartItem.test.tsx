import CartItem from "@/components/Cart/ui/CartItem";
import type { CartItemType } from "@/lib/cart/cart-types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const removeItem = vi.fn();
const increaseRentDays = vi.fn();
const decreaseRentDays = vi.fn();

vi.mock("@/lib/cart/cart-store", () => ({
  default: vi.fn((selector) =>
    selector({
      removeItem,
      increaseRentDays,
      decreaseRentDays,
    }),
  ),
}));

const item: CartItemType = {
  id: "1",
  name: "Бензопила",
  daily_price: 1000,
  rentDays: 1,
  image_url: "/test-image.jpg",
};

describe("CartItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает название инструмента", () => {
    render(<CartItem item={item} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /бензопила/i }),
    ).toBeInTheDocument();
  });

  it("отображает фото инструмента", () => {
    render(<CartItem item={item} />);

    expect(screen.getByRole("img", { name: "Бензопила" })).toBeInTheDocument();
  });

  it("отображает текст Нет фото для инструмента без фото", () => {
    render(<CartItem item={{ ...item, image_url: null }} />);

    expect(screen.getByText("Нет фото")).toBeInTheDocument();
  });

  it("отображает итоговую цену за срок аренды", () => {
    render(<CartItem item={{ ...item, daily_price: 1000, rentDays: 3 }} />);

    expect(screen.getByText("3000 ₽")).toBeInTheDocument();
  });

  it("вызывает decreaseRentDays с id товара по клику на −", async () => {
    render(<CartItem item={{ ...item, rentDays: 2 }} />);

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Уменьшить количество дней" }),
    );

    expect(decreaseRentDays).toHaveBeenCalledTimes(1);
    expect(decreaseRentDays).toHaveBeenCalledWith("1");
  });

  it("вызывает increaseRentDays с id товара по клику на +", async () => {
    render(<CartItem item={item} />);

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Увеличить количество дней" }),
    );

    expect(increaseRentDays).toHaveBeenCalledTimes(1);
    expect(increaseRentDays).toHaveBeenCalledWith("1");
  });

  it("вызывает removeItem с id товара по клику на Удалить", async () => {
    render(<CartItem item={item} />);

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Удалить инструмент из корзины" }),
    );

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith("1");
  });

  it("кнопка − заблокирована при количестве дней 1", () => {
    render(<CartItem item={item} />);

    expect(
      screen.getByRole("button", { name: "Уменьшить количество дней" }),
    ).toBeDisabled();
  });
});
