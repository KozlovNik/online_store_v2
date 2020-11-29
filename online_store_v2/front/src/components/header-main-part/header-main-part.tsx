import React, { useState } from "react";

import classNames from "classnames";

import "./header-main-part.css";

import { connect, ConnectedProps } from "react-redux";
import { getCartTotal } from "../../store/selectors";
import { Link } from "react-router-dom";
import LabelBlock from "../label-block";
import ProfileBlock from "../profile-block";
import { RootState } from "../../store";
import logo from "../svgs/logo.svg";
import Navbar from "../navbar-els";

const mapStateToProps = (state: RootState) => {
  return { ...getCartTotal(state) };
};

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

const HeaderMainPart = ({ quantity, totalSum }: Props) => {
  const [hideNav, setHideNav] = useState(true);

  const handleClick = () => {
    setHideNav(true);
  };

  return (
    <div className="header-wrapper-outer">
      <section className="header-upper-part">
        <div className="header-upper-part__item header-upper-part__item--logo">
          <img src={logo} className="header-logo" />
        </div>
        <p className="header-upper-part__item--phone-number">
          +7 (800) 234 56 78
        </p>

        <ProfileBlock />
        <div className="header-upper-part__item header-upper-part__item--cart">
          <p className="cart">
            <Link to="/cart" className="cart__link">
              <svg
                width="25"
                height="30"
                viewBox="0 0 25 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="11.1306"
                  cy="27.4138"
                  rx="2.4197"
                  ry="2.58621"
                  fill="#51534C"
                />
                <ellipse
                  cx="19.8416"
                  cy="27.4138"
                  rx="2.4197"
                  ry="2.58621"
                  fill="#51534C"
                />
                <rect width="4.83941" height="2.06897" rx="1" fill="#51534C" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.28413 22.0018C8.39565 22.4466 8.79549 22.7586 9.25411 22.7586H21.3385C21.7971 22.7586 22.197 22.4466 22.3085 22.0018L22.3258 21.9328C22.484 21.3015 22.0066 20.6897 21.3558 20.6897H9.23682C8.58598 20.6897 8.10857 21.3015 8.26684 21.9328L8.28413 22.0018Z"
                  fill="#51534C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.01771 0.974683C4.88409 0.441708 4.33557 0.125372 3.80734 0.276651V0.276651C3.3034 0.420974 3.00469 0.938923 3.13216 1.44739L8.29044 22.023C8.39884 22.4554 8.78745 22.7586 9.23321 22.7586V22.7586C9.86579 22.7586 10.3298 22.1639 10.176 21.5503L5.01771 0.974683Z"
                  fill="#51534C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.9202 10.3448C24.5711 10.3448 25.0485 10.9567 24.8902 11.588L24.8729 11.657C24.7614 12.1018 24.3616 12.4138 23.9029 12.4138H7.28373C6.86852 12.4138 6.49651 12.1572 6.34898 11.7691L6.32276 11.7001C6.07401 11.0457 6.55741 10.3448 7.25751 10.3448H23.9202Z"
                  fill="#51534C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.9672 11.5531C25.1211 10.9395 24.657 10.3448 24.0245 10.3448V10.3448C23.5787 10.3448 23.1901 10.6481 23.0817 11.0804L20.554 21.1628C20.4266 21.6713 20.7253 22.1892 21.2292 22.3336V22.3336C21.7574 22.4848 22.306 22.1685 22.4396 21.6355L24.9672 11.5531Z"
                  fill="#51534C"
                />
              </svg>
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
      </section>
      <nav className="header-lower-part">
        <div className="sandwich-button" onClick={() => setHideNav(false)}>
          <div className="sandwich-button__wrapper">
            <div className="sandwich-button__hor-bar"></div>
            <div className="sandwich-button__hor-bar"></div>
            <div className="sandwich-button__hor-bar"></div>
          </div>
        </div>
        <ul className={classNames("navbar", { "navbar--hidden": hideNav })}>
          <LabelBlock label="Меню" handleClick={handleClick} />
          <Navbar handleClick={handleClick} prefix="navbar" />
        </ul>
      </nav>
    </div>
  );
};

export default connector(HeaderMainPart);
