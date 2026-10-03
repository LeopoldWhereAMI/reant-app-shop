import AddToCartButton from "@/components/Catalog/ui/AddToCartButton";
import type { CartItemType } from "@/lib/cart/cart-types";
import { useCartHydration } from "@/lib/cart/useCartHydration";
import type { InventoryItem } from "@/types/inventory";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const addToCart = vi.fn();
const removeItem = vi.fn();

let cart: CartItemType[] = [];

vi.mock("@/lib/cart/cart-store", () => ({
  default: vi.fn((selector) =>
    selector({
      cart,
      addToCart,
      removeItem,
    }),
  ),
}));

vi.mock("@/lib/cart/useCartHydration", () => ({
  useCartHydration: vi.fn(),
}));

const propItem: InventoryItem = {
  id: "1",
  name: "Бензопила",
  category: "gas_tools",
  daily_price: 1000,
  status: "available",
  serial_number: "SN-001",
  total_work_days: 0,
  purchase_price: 0,
  image_url: null,
};

const cartItem: CartItemType = {
  id: "1",
  name: "Бензопила",
  daily_price: 1000,
  image_url: null,
  rentDays: 1,
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    cart = [];
    vi.clearAllMocks();
    vi.mocked(useCartHydration).mockReturnValue(true);
  });

  it("показывает скелетон до завершения гидратации", () => {
    vi.mocked(useCartHydration).mockReturnValue(false);

    const { container } = render(<AddToCartButton item={propItem} />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("когда товар ещё не добавлен в корзину - отображается кнопка «В корзину»", () => {
    render(<AddToCartButton item={propItem} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("В корзину");
  });

  it("когда товар  добавлен в корзину - отображается кнопка «Удалить»", () => {
    cart = [cartItem];

    render(<AddToCartButton item={propItem} />);

    expect(screen.getByRole("button")).toHaveTextContent("Удалить");
  });

  it("кнопка заблокированна если инструмент недоступен", () => {
    render(<AddToCartButton item={propItem} disabled />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("если кнопка заблокированна то клик не сработает", async () => {
    render(<AddToCartButton item={propItem} disabled />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(addToCart).not.toHaveBeenCalled();
  });

  it("при клике вызывает функцию addToCart", async () => {
    render(<AddToCartButton item={propItem} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(addToCart).toHaveBeenCalledWith(cartItem);
  });

  it("при клике вызывает функцию removeItem", async () => {
    cart = [cartItem];

    render(<AddToCartButton item={propItem} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(removeItem).toHaveBeenCalledWith(propItem.id);
  });
});
