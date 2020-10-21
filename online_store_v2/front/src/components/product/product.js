import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  addToLikes,
  deleteFromLikes,
  setModalWindow,
} from "../../redux/actions";

import AddToCart from "../add-to-cart";
import Breadcrumbs from "../breadcrumbs";

import "./product.css";

const Product = ({
  likes,
  addToLikes,
  deleteFromLikes,
  isAuthenticated,
  setModalWindow,
}) => {
  const { category, product } = useParams();
  const [productInfo, setProductInfo] = useState();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${product}`).then((res) => {
      setProductInfo(res.data);
    });
  }, [category, product]);

  if (!productInfo) return null;

  const {
    id,
    image,
    name,
    available,
    price,
    slug,
    category: categoryInfo,
  } = productInfo;

  const handleAddTolikesClick = () => {
    if (isAuthenticated) {
      return addToLikes(id);
    }
    return setModalWindow(true);
  };

  return (
    <div>
      <Breadcrumbs category={categoryInfo} name={name} />
      <div className="product-card">
        <div className="product-card__gallery product-gallery">
          <img className="product-gallery__image" src={image} alt="" />
        </div>
        <div className="product-main">
          <div className="product-main__wrapper">
            <div>
              <h1 className="product-card__title">{name}</h1>
              {likes.indexOf(id) > -1 ? (
                <a
                  className="add-to-favorites add-to-favorites--active"
                  onClick={() => deleteFromLikes(id)}
                >
                  Удалить из избранного
                </a>
              ) : (
                <a onClick={handleAddTolikesClick} className="add-to-favorites">
                  Добавить в избранное
                </a>
              )}
            </div>
            <div className="product-card__product-buy product-buy">
              <div className="product-card__price-wrapper">
                <p className="product-buy__price">{price} руб.</p>
                <p className="product-buy__available">
                  {available ? "В наличии" : "Нет в наличии"}
                </p>
              </div>
              <div className="product-card__text">
                <p>Доставка в г. Москва:</p>
                <p>Самовывоз — бесплатно</p>
                <p>Курьерская доставка — от 249 руб.</p>
              </div>
              <AddToCart slug={slug} />
            </div>
          </div>
        </div>
        <section className="about">
          <div className="about-tabs">
            <span
              onClick={() => {
                setActiveTab(0);
              }}
              className={classNames("about-tabs__tab", {
                "about-tabs__tab--active": activeTab === 0,
              })}
            >
              О ТОВАРЕ
            </span>
            <span
              onClick={() => {
                setActiveTab(1);
              }}
              className={classNames("about-tabs__tab", {
                "about-tabs__tab--active": activeTab === 1,
              })}
            >
              ОТЗЫВЫ
            </span>
          </div>
          <p className="about-sections">
            {activeTab === 0 ? productInfo.description : "hello"}
          </p>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.auth;
  return { isAuthenticated, likes: user.likes };
};

export default connect(mapStateToProps, {
  setModalWindow,
  addToLikes,
  deleteFromLikes,
})(Product);
