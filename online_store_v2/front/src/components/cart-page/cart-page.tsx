import React from "react";
import "./cart-page.css";

import CartItem from "../cart-item";

import { connect } from "react-redux";
import { Cart } from "../../store/products/types";

const CartPage: React.FC<Cart> = ({ cartItems }) => {
  let content =
    cartItems.length > 0 ? (
      <>
        <h2 className="cart__heading">КОРЗИНА</h2>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className="cart-total-part">
          <div className="cart-total-part__item">Итого {} руб.</div>
        </div>
        <section className="make-order">
          <h3 className="make-order__heading">Оформление заказа</h3>
          <form method="post">
            <input
              className="make-order__button"
              type="submit"
              name="checkout"
              value="Оформить заказ"
            />
          </form>
        </section>
      </>
    ) : (
      <p className="cart__empty">Ваша корзина пуста</p>
    );
  return content;
};

const mapStateToProps = (state: any) => {
  const cartItems = state.products.cartItems;
  return {
    cartItems,
  };
};

export default connect(mapStateToProps)(CartPage);
