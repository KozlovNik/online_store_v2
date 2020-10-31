import { RootState } from "./";

type item = { quantity: number; totalSum: string };
type total = { quantity: number; item_total: string };

export const getCartTotal = (store: RootState) => {
  const reducer = (acc: item, curVal: total) => ({
    quantity: acc.quantity + curVal.quantity,
    totalSum: (parseInt(acc.totalSum) + parseInt(curVal.item_total)).toFixed(2),
  });

  return store.products.cartItems.reduce(reducer, {
    quantity: 0,
    totalSum: "0.00",
  });
};
