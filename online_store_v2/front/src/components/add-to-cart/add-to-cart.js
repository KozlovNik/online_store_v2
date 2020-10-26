import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../../store/products/actions";

import "./add-to-cart.css";

const AddToCart = ({ slug, cartItems, addCartItem }) => {
  return cartItems.indexOf(slug) > -1 ? (
    <Link to="/cart" className="add-to-cart">
      Перейти в корзину
    </Link>
  ) : (
    <a className="add-to-cart" onClick={() => addCartItem(slug)}>
      Добавить
    </a>
  );
};

const mapStateToProps = (state) => {
  let { cartItems } = state.products;
  cartItems = cartItems.map((item) => item.product.slug);
  return {
    cartItems,
  };
};

export default connect(mapStateToProps, { addCartItem })(AddToCart);
