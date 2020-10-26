export const getCartTotal = (store: any) => {
  const reducer = (acc: any, curVal: any) => ({
    quantity: acc.quantity + curVal.quantity,
    totalSum: (parseInt(acc.totalSum) + parseInt(curVal.item_total)).toFixed(2),
  });

  return store.products.cartItems.reduce(reducer, {
    quantity: 0,
    totalSum: "0.00",
  });
};
