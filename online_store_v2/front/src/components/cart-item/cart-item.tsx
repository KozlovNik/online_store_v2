import React from "react";

import { connect, ConnectedProps } from "react-redux";
import { deleteCartItem } from "../../store/products/actions";
import { Link } from "react-router-dom";
import { CartItem as CartItemInterface } from "../../store/products/types";

import "./cart-item.css";
import { RootState } from "../../store";

import {
  addToLikes,
  deleteFromLikes,
  setModalWindow,
} from "../../store/auth/actions";
import NumSwitch from "../num-switch";
import classNames from "classnames";
import Spinner from "../spinner";

const CartItem: React.FC<Props> = (props) => {
  const {
    id,
    item_total,
    deleteCartItem,
    setModalWindow,
    isAuthenticated,
    addToLikes,
    deleteFromLikes,
    product: { id: productId, name, image, category, slug },
    likes,
    isItemLoading,
  } = props;

  const link = `/products/${category.slug}/${slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteCartItem(id);
  };

  const handleAddTolikesClick = () => {
    if (isAuthenticated) {
      return addToLikes(productId);
    }
    return setModalWindow(true);
  };

  return (
    <section className="cart-item">
      <div
        className={classNames(
          { "cart-item__loading--show": isItemLoading },
          "cart-item__loading"
        )}
      >
        <Spinner />
      </div>
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
          {likes.indexOf(productId) > -1 ? (
            <a
              className="cart-action__link"
              onClick={() => deleteFromLikes(productId)}
            >
              Удалить из закладок
            </a>
          ) : (
            <a className="cart-action__link" onClick={handleAddTolikesClick}>
              Добавить в закладки
            </a>
          )}
        </div>
      </div>
      <div className="cart-item__block">
        <NumSwitch id={id} />
      </div>
      <div className="cart-item__block cart-item__block--custom">
        <span>{item_total} </span>руб.
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootState) => {
  const { user, isAuthenticated } = state.auth;
  return {
    isAuthenticated,
    likes: user.likes,
  };
};

const connector = connect(mapStateToProps, {
  deleteCartItem,
  addToLikes,
  setModalWindow,
  deleteFromLikes,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & CartItemInterface;

export default connector(CartItem);
