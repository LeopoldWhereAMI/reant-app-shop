import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItemType } from "./cart-types";

type CartStore = {
  cart: CartItemType[];

  addToCart: (item: CartItemType) => void;
  removeItem: (id: string) => void;

  increaseRentDays: (id: string) => void;
  decreaseRentDays: (id: string) => void;
};

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) => {
        set((state) => {
          return { cart: [...state.cart, item] };
        });
      },

      removeItem: (id) => {
        set((state) => {
          return { cart: state.cart.filter((i) => i.id !== id) };
        });
      },

      increaseRentDays: (id) => {
        set((state) => {
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, rentDays: item.rentDays + 1 } : item,
            ),
          };
        });
      },

      decreaseRentDays: (id) => {
        set((state) => {
          return {
            cart: state.cart.map((item) =>
              item.id === id
                ? { ...item, rentDays: Math.max(1, item.rentDays - 1) }
                : item,
            ),
          };
        });
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
