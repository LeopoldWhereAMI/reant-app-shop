import CartSummary from "@/components/Cart/ui/CartSummary";
import type { CartItemType } from "@/lib/cart/cart-types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.fn(() => true);
let isAuthLoading = false;

vi.mock("@/components/Cart/hooks/useCartAuth", () => ({
  default: vi.fn(() => ({
    isAuthLoading,
    requireAuth,
  })),
}));

let onSuccess: () => void;
let loading = false;

vi.mock("@/components/Cart/hooks/useCartOrder", () => ({
  default: vi.fn((_items, success) => {
    onSuccess = success;

    return {
      loading,
      error: null,
      submitOrder: vi.fn(),
    };
  }),
}));

const handleOpen = vi.fn();
const handleClose = vi.fn();

vi.mock("@/components/Cart/hooks/useCartConfirmModal", () => ({
  default: vi.fn(() => ({
    dialogRef: { current: null },
    handleOpen,
    handleClose,
  })),
}));

vi.mock("@/lib/cart/cart-store", () => ({
  default: vi.fn((selector) =>
    selector({
      cart,
    }),
  ),
}));

vi.mock("@/components/Cart/ui/RentConfirmModal", () => ({
  default: () => <div>Модальное окно</div>,
}));

const mockSetOrderCreated = vi.fn();

const cartItems: CartItemType[] = [
  { id: "1", name: "бензопила", daily_price: 1000, rentDays: 1 },
  { id: "2", name: "перфоратор", daily_price: 500, rentDays: 2 },
];

let cart: CartItemType[] = [];

describe("CartSummary", () => {
  beforeEach(() => {
    isAuthLoading = false;
    loading = false;
    onSuccess = vi.fn();
    vi.clearAllMocks();
    requireAuth.mockReturnValue(true);
  });

  it("показывает количество позиций в корзине", () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const count = cartItems.length;

    expect(screen.getByText(count)).toBeInTheDocument();
  });

  it("показывает общую стоимость аренды за 1 день", () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const dailyTotal = cartItems.reduce(
      (acc, item) => acc + item.daily_price,
      0,
    );

    expect(screen.getByText(`${dailyTotal} ₽`)).toBeInTheDocument();
  });

  it("показывает общую стоимость аренды за все дни", () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.daily_price * item.rentDays,
      0,
    );

    expect(screen.getByText(`${totalPrice} ₽`)).toBeInTheDocument();
  });

  it("при клике по кнопке Оформить аренду вызывается requireAuth()", async () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Оформить аренду" }));

    expect(requireAuth).toHaveBeenCalledTimes(1);
  });

  it("при успешной проверке авторизации вызывается handleOpen()", async () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Оформить аренду" }));

    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it("не открывает модальное окно, если пользователь не авторизован", async () => {
    requireAuth.mockReturnValue(false);

    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Оформить аренду" }));

    expect(requireAuth).toHaveBeenCalledTimes(1);
    expect(handleOpen).not.toHaveBeenCalled();
  });

  it("кнопка Оформить аренду заблокирована во время проверки авторизации ", () => {
    isAuthLoading = true;

    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    expect(
      screen.getByRole("button", { name: "Оформить аренду" }),
    ).toBeDisabled();
  });

  it("кнопка Оформить аренду заблокирована во время loading ", () => {
    loading = true;

    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    expect(
      screen.getByRole("button", { name: "Оформить аренду" }),
    ).toBeDisabled();
  });

  it("кнопка Оформить аренду заблокирована при пустой корзине", () => {
    render(<CartSummary items={[]} setOrderCreated={mockSetOrderCreated} />);

    expect(
      screen.getByRole("button", { name: "Оформить аренду" }),
    ).toBeDisabled();
  });

  it("при успешном создании заказа устанавливает orderCreated и закрывает модальное окно", () => {
    render(
      <CartSummary items={cartItems} setOrderCreated={mockSetOrderCreated} />,
    );

    onSuccess();

    expect(mockSetOrderCreated).toHaveBeenCalledTimes(1);
    expect(mockSetOrderCreated).toHaveBeenCalledWith(true);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
