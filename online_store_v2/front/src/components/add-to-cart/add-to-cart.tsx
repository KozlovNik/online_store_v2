import React from "react";

import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { addCartItem } from "../../store/products/actions";

import "./add-to-cart.css";

const AddToCart = ({ slug, cartItems, addCartItem, available }: Props) => {
  let btn;
  if (available) {
    if (cartItems.indexOf(slug) > -1) {
      btn = (
        <Link to="/cart" className="add-to-cart">
          Перейти в корзину
        </Link>
      );
    } else {
      btn = (
        <a className="add-to-cart" onClick={() => addCartItem(slug)}>
          Добавить
        </a>
      );
    }
  } else {
    btn = (
      <a
        className="add-to-cart add-to-cart--not-available"
        onClick={() => addCartItem(slug)}
      >
        Нет в наличии
      </a>
    );
  }
  return btn;
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
  available: boolean;
};

export default connector(AddToCart);
