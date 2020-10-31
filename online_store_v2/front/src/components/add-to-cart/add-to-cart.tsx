import React from "react";

import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { addCartItem } from "../../store/products/actions";

import "./add-to-cart.css";

const AddToCart = ({ slug, cartItems, addCartItem }: Props) => {
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

const mapStateToProps = (state: RootState) => {
  return {
    cartItems: state.products.cartItems.map((item) => item.product.slug),
  };
};

const connector = connect(mapStateToProps, { addCartItem });

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  slug: string;
};

export default connector(AddToCart);
