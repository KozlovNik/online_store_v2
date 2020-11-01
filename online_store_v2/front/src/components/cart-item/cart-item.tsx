import React from "react";

import { connect, ConnectedProps } from "react-redux";
import { deleteCartItem, updateCartItem } from "../../store/products/actions";
import { Link } from "react-router-dom";

import "./cart-item.css";
import { RootState } from "../../store";
import {
  addToLikes,
  deleteFromLikes,
  setModalWindow,
} from "../../store/auth/actions";

interface CartItemInterface {
  id: number;
  quantity: number;
  item_total: number;
  product: {
    id: number;
    name: string;
    image: string;
    category: { slug: string };
    slug: string;
  };
}

const CartItem: React.FC<Props> = (props) => {
  const {
    id,
    quantity,
    item_total,
    deleteCartItem,
    updateCartItem,
    setModalWindow,
    isAuthenticated,
    addToLikes,
    deleteFromLikes,
    product: { id: productId, name, image, category, slug },
    likes,
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

const mapStateToProps = (state: RootState) => {
  const { user, isAuthenticated } = state.auth;
  return {
    isAuthenticated,
    likes: user.likes,
  };
};

const connector = connect(mapStateToProps, {
  deleteCartItem,
  updateCartItem,
  addToLikes,
  setModalWindow,
  deleteFromLikes,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & CartItemInterface;

export default connector(CartItem);
