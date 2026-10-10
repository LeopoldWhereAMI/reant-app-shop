import { createOrder } from "@/actions/orders/createOrder";
import useCartOrder from "@/components/Cart/hooks/useCartOrder";
import useCartStore from "@/lib/cart/cart-store";
import { CartItemType } from "@/lib/cart/cart-types";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/actions/createOrder", () => ({
  createOrder: vi.fn(),
}));

vi.mock("@/lib/cart/cart-store", () => ({
  default: vi.fn(),
}));

const clearCart = vi.fn();
const onSuccess = vi.fn();

const items: CartItemType[] = [
  {
    id: "1",
    name: "Бензопила",
    daily_price: 1000,
    rentDays: 2,
  },
];

describe("useCartOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCartStore).mockImplementation((selector) =>
      selector({
        clearCart,
      } as any),
    );
  });

  it("создает заказ, очищает корзину и вызывает onSuccess", async () => {
    const { result } = renderHook(() => useCartOrder(items, onSuccess));

    await act(async () => {
      await result.current.submitOrder();
    });

    expect(createOrder).toHaveBeenCalledWith([
      {
        id: "1",
        rentDays: 2,
      },
    ]);

    expect(clearCart).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("устанавливает loading во время создания заказа", async () => {
    let resolveOrder!: (value: Awaited<ReturnType<typeof createOrder>>) => void;

    vi.mocked(createOrder).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveOrder = resolve;
        }),
    );

    const { result } = renderHook(() => useCartOrder(items, onSuccess));

    let submitPromise: Promise<void>;

    act(() => {
      submitPromise = result.current.submitOrder();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveOrder({} as Awaited<ReturnType<typeof createOrder>>);
      await submitPromise;
    });

    expect(result.current.loading).toBe(false);
  });

  it("устанавливает ошибку, если создание заказа завершилось ошибкой", async () => {
    vi.mocked(createOrder).mockRejectedValue(
      new Error("Ошибка создания заказа"),
    );

    const { result } = renderHook(() => useCartOrder(items, onSuccess));

    await act(async () => {
      await result.current.submitOrder();
    });

    expect(result.current.error).toBe("Ошибка создания заказа");
    expect(clearCart).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it("использует стандартное сообщение, если ошибка не является Error", async () => {
    vi.mocked(createOrder).mockRejectedValue("Ошибка");

    const { result } = renderHook(() => useCartOrder(items, onSuccess));

    await act(async () => {
      await result.current.submitOrder();
    });

    expect(result.current.error).toBe("Не удалось создать заказ");
    expect(clearCart).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });
});
