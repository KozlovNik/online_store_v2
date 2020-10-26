import React, { useState } from "react";

import classNames from "classnames";

import "./header-main-part.css";

import { connect } from "react-redux";
import { getCartTotal } from "../../store/selectors";
import { Link } from "react-router-dom";
import LabelBlock from "../label-block";
import ProfileBlock from "../profile-block";

const navbar = [
  { title: "О нас", link: "/about" },
  { title: "Новости", link: "/news" },
  { title: "Акции", link: "/discounts" },
  { title: "Продукты", link: "/products" },
  { title: "Статьи", link: "/articles" },
  { title: "Доставка и оплата", link: "/delivery" },
  { title: "Контакты", link: "/contacts" },
];

const HeaderMainPart = ({ quantity, totalSum }) => {
  const [hideNav, setHideNav] = useState(true);

  const handleClick = () => {
    setHideNav(() => true);
  };

  const navbarEls = navbar.map((el) => {
    const { title, link } = el;
    return (
      <li key={title} className="navbar__item">
        <Link to={link} className="navbar__link" onClick={setHideNav}>
          {title}
        </Link>
      </li>
    );
  });

  return (
    <div className="header-wrapper-outer">
      <section className="header-upper-part">
        <div className="header-upper-part__wrapper">
          <div className="header-upper-part__left left-side">
            <div className="left-side__item">
              <p className="left-side__phone-number">+7 (800) 234 80 55</p>
              <p className="left-side__phone-number">+7 (800) 234 80 54</p>
              <p className="left-side__working-hours">09:00-21:00 пн-пт</p>
              <p className="left-side__working-hours">10:00-20:00 сб-вс</p>
            </div>
            <div className="left-side__item">
              <div className="left-side__delivery-wrapper">
                <img
                  className="left-side__delivery-image"
                  src="http://localhost:8000/static/store_app/delivery-logo.png"
                  alt=""
                />
                <div className="">
                  <p className="left-side__delivery">Быстрая доставка</p>
                  <p className="left-side__delivery">свежих продуктов</p>
                  <p className="left-side__delivery">По Москве</p>
                </div>
              </div>
            </div>
          </div>
          <img
            className="logo"
            src="http://localhost:8000/static/store_app/1.png"
            alt=""
          />
          <div className="header-upper-part__right-side right-side">
            <ProfileBlock />
            <div className="right-side__item right-side__item--cart">
              <p className="cart">
                <Link to="/cart" className="cart__link">
                  <img
                    className="cart__image"
                    src="http://localhost:8000/static/store_app/cart.png"
                    alt=""
                  />
                  <span className="cart__label">КОРЗИНА</span>
                </Link>
              </p>
              {quantity > 0 && (
                <div className="cart-order__wrapper">
                  <div>
                    <p className="cart__paragraph">Товаров: {quantity} шт.</p>
                    <p className="cart__paragraph">Сумма: {totalSum} руб.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <nav className="header-lower-part">
        <div
          className="sandwich-button"
          onClick={() => setHideNav(() => false)}
        >
          <div className="sandwich-button__wrapper">
            <div className="sandwich-button__hor-bar"></div>
            <div className="sandwich-button__hor-bar"></div>
            <div className="sandwich-button__hor-bar"></div>
          </div>
        </div>
        <ul className={classNames("navbar", { "navbar--hidden": hideNav })}>
          <LabelBlock label="Меню" handleClick={handleClick} />
          {navbarEls}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...getCartTotal(state) };
};

export default connect(mapStateToProps)(HeaderMainPart);
