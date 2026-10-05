import CartList from "@/components/Cart/ui/CartList";
import type { CartItemType } from "@/lib/cart/cart-types";
import { useCartHydration } from "@/lib/cart/useCartHydration";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/cart/useCartHydration", () => ({
  useCartHydration: vi.fn(),
}));

vi.mock("@/lib/cart/cart-store", () => ({
  default: vi.fn((selector) =>
    selector({
      cart,
    }),
  ),
}));

vi.mock("@/components/Cart/ui/CartEmpty", () => ({
  default: () => <div>Корзина пуста</div>,
}));

vi.mock("@/components/Cart/ui/CartSuccess", () => ({
  default: () => <div>Заказ успешно оформлен</div>,
}));

vi.mock("@/components/Cart/ui/CartSummary", () => ({
  default: ({
    setOrderCreated,
  }: {
    setOrderCreated: (state: boolean) => void;
  }) => (
    <>
      <div>Итого</div>
      <button onClick={() => setOrderCreated(true)}>Создать заказ</button>
    </>
  ),
}));

vi.mock("@/components/Cart/ui/CartItem", () => ({
  default: ({ item }: { item: CartItemType }) => (
    <div data-testid="cart-item">{item.name}</div>
  ),
}));

const cartItems: CartItemType[] = [
  { id: "1", name: "бензопила", daily_price: 1000, rentDays: 1 },
  { id: "2", name: "перфоратор", daily_price: 500, rentDays: 2 },
];

let cart: CartItemType[] = [];

describe("CartList", () => {
  beforeEach(() => {
    cart = [];
    vi.mocked(useCartHydration).mockReturnValue(true);
  });

  it("показывает скелетон до завершения гидратации", () => {
    vi.mocked(useCartHydration).mockReturnValue(false);

    render(<CartList />);

    expect(screen.getByText("Загрузка корзины...")).toBeInTheDocument();
  });

  it("показывает компонент CartEmpty если корзина пуста", () => {
    render(<CartList />);

    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  it("рендерит CartItem для каждого элемента корзины", () => {
    cart = cartItems;

    render(<CartList />);

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
  });

  it("показывает компонент CartSummary если в корзине есть товары", () => {
    cart = cartItems;

    render(<CartList />);

    expect(screen.getByText("Итого")).toBeInTheDocument();
  });

  it("показывает компонент CartSuccess после создания заказа", async () => {
    cart = cartItems;

    const user = userEvent.setup();

    render(<CartList />);

    await user.click(screen.getByRole("button", { name: "Создать заказ" }));

    expect(screen.getByText("Заказ успешно оформлен")).toBeInTheDocument();
  });
});
