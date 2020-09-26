import React, { useEffect } from "react";

import "./products.css";

import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts, addCartItem } from "../../redux/actions";

const Products = ({ productsByCategory, getProducts, addCartItem, items }) => {
  let { category } = useParams();

  useEffect(() => {
    getProducts(category);
  }, [category, getProducts]);

  return (
    <div className="catalog-wrapper">
      {productsByCategory.map(({ image, name, price, slug }) => {
        return (
          <div className="product" key={slug}>
            <div className="product__image-wrapper">
              <a className="product__image-link">
                <img src={image} className="product__image" alt="" />
              </a>
            </div>
            <div className="product__rating"></div>
            <div className="product__title">
              <a className="product__title-link">{name}</a>
            </div>
            <div className="product__price">
              <b>{price} рублей</b>
            </div>
            <div className="add-to-cart-button">
              {items.indexOf(slug) > -1 ? (
                <Link to="/cart" className="add-to-cart">
                  Перейти в корзину
                </Link>
              ) : (
                <a className="add-to-cart" onClick={() => addCartItem(slug)}>
                  Добавить
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  let { productsByCategory, cartItems } = state.products;
  cartItems = cartItems.map((item) => item.product.slug);
  return {
    productsByCategory,
    items: cartItems,
  };
};

export default connect(mapStateToProps, { getProducts, addCartItem })(
  Products
);
