import useCartStore from "@/lib/cart/cart-store";
import type { CartItemType } from "@/lib/cart/cart-types";
import { beforeEach, describe, expect, it } from "vitest";

const item1: CartItemType = {
  id: "1",
  name: "Бензопила",
  daily_price: 1000,
  image_url: null,
  rentDays: 1,
};

const item2: CartItemType = {
  id: "2",
  name: "Перфоратор",
  daily_price: 500,
  image_url: null,
  rentDays: 2,
};

describe("cart-store", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  describe("addToCart", () => {
    it("добавляет товар в корзину", () => {
      useCartStore.getState().addToCart(item1);

      expect(useCartStore.getState().cart).toEqual([item1]);
    });
  });

  describe("removeItem", () => {
    it("удаляет нужный товар из корзины", () => {
      useCartStore.getState().addToCart(item1);
      useCartStore.getState().addToCart(item2);

      useCartStore.getState().removeItem("2");

      expect(useCartStore.getState().cart).toEqual([item1]);
    });
  });

  describe("clearCart", () => {
    it("очищает корзину", () => {
      useCartStore.getState().addToCart(item1);
      useCartStore.getState().addToCart(item2);

      useCartStore.getState().clearCart();

      expect(useCartStore.getState().cart).toHaveLength(0);
    });
  });

  describe("increaseRentDays", () => {
    it("увеличивает дни выбранного товара", () => {
      useCartStore.getState().addToCart(item1);
      useCartStore.getState().addToCart(item2);

      useCartStore.getState().increaseRentDays("1");

      expect(useCartStore.getState().cart).toEqual([
        { ...item1, rentDays: 2 },
        item2,
      ]);
    });
  });

  describe("decreaseRentDays", () => {
    it("уменьшает дни выбранного товара.", () => {
      useCartStore.getState().addToCart(item1);
      useCartStore.getState().addToCart(item2);

      useCartStore.getState().decreaseRentDays("2");

      expect(useCartStore.getState().cart).toEqual([
        item1,
        { ...item2, rentDays: 1 },
      ]);
    });

    it("количество дней не может быть < 1", () => {
      useCartStore.getState().addToCart(item1);
      useCartStore.getState().addToCart(item2);

      useCartStore.getState().decreaseRentDays("1");

      expect(useCartStore.getState().cart).toEqual([
        { ...item1, rentDays: 1 },
        item2,
      ]);
    });
  });
});
