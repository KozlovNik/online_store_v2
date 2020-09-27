import React from "react";

import { connect } from "react-redux";
import { deleteCartItem, updateCartItem } from "../../redux/actions";

import "./cart-item.css";

const CartItem = (props) => {
  const {
    id,
    quantity,
    item_total,
    deleteCartItem,
    updateCartItem,
    product: { name, image },
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    deleteCartItem(id);
  };

  const handleChange = (e) => {
    const quantity = e.target.value
    updateCartItem(id, quantity)
  }

  return (
    <section className="cart-item">
      <div className="cart-item__block">
        <img className="cart-item__image" src={image} alt="" />
      </div>
      <div className="cart-item__block cart-item__block--title">
        <a className="cart-item__name">{name}</a>
        <div className="cart-action">
          <a className="cart-action__link" onClick={handleClick}>
            Удалить
          </a>
          <span> | </span>
          <a className="cart-action__link">Добавить в закладки</a>
        </div>
      </div>
      <div className="cart-item__block">
        <input
          type="number"
          name="quantity"
          className="cart-item__quantity"
          value={quantity}
          min="1"
          max="100"
          onChange={handleChange}
        />
      </div>
      <div className="cart-item__block">
        <span>{item_total} </span>руб.
      </div>
    </section>
  );
};

export default connect(null, { deleteCartItem, updateCartItem })(CartItem);
