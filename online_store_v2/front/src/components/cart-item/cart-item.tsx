import React from "react";

import { connect } from "react-redux";
import { deleteCartItem, updateCartItem } from "../../store/products/actions";
import { Link } from "react-router-dom";

import "./cart-item.css";

interface CartItemInterface {
  id: number;
  quantity: number;
  item_total: number;
  deleteCartItem: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  product: {
    name: string;
    image: string;
    category: { slug: string };
    slug: string;
  };
}

const CartItem: React.FC<CartItemInterface> = (props) => {
  const {
    id,
    quantity,
    item_total,
    deleteCartItem,
    updateCartItem,
    product: { name, image, category, slug },
  } = props;

  const link = `/products/${category.slug}/${slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteCartItem(id);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const quantity = parseInt((e.target as HTMLInputElement).value);
    updateCartItem(id, quantity);
  };

  return (
    <section className="cart-item">
      <div className="cart-item__block">
        <Link to={link}>
          <img className="cart-item__image" src={image} alt="" />
        </Link>
      </div>
      <div className="cart-item__block cart-item__block--title">
        <Link to={link} className="cart-item__name">
          {name}
        </Link>
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
