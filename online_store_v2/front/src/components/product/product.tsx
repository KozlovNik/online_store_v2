import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import { connect, ConnectedProps } from "react-redux";

import { addToLikes, deleteFromLikes } from "../../store/auth/actions";
import { addRecentlyViewedItem } from "../../store/recently-viewed/actions";

import { setModalWindow } from "../../store/auth/actions";

import AddToCart from "../add-to-cart";
import Breadcrumbs from "../breadcrumbs";
import { Product as ProductType } from "../../store/products/types";

import "./product.css";
import { RootState } from "../../store";

const Product = ({
  likes,
  addToLikes,
  deleteFromLikes,
  isAuthenticated,
  setModalWindow,
  addRecentlyViewedItem,
}: PropsFromRedux) => {
  const { category, product } = useParams<RouteParams>();
  const [productInfo, setProductInfo] = useState<ProductType>();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${product}`).then((res) => {
      setProductInfo(res.data);
      addRecentlyViewedItem(res.data.id);
    });
  }, [category, product]);

  // useEffect(()=>{
  //   addRecentlyViewedItem(id)
  // },[productInfo.id])

  if (!productInfo) return null;

  const {
    id,
    image,
    name,
    available,
    price,
    slug,
    isProductLoading,
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
              <AddToCart
                slug={slug}
                available={available}
                isProductLoading={isProductLoading}
              />
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

const mapStateToProps = (state: RootState) => {
  const { isAuthenticated, user } = state.auth;
  return { isAuthenticated, likes: user.likes };
};

interface RouteParams {
  category: string;
  product: string;
}

const connector = connect(mapStateToProps, {
  setModalWindow,
  addToLikes,
  deleteFromLikes,
  addRecentlyViewedItem,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Product);
