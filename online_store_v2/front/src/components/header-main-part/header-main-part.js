import React from 'react';

import './header-main-part.css';


const HeaderMainPart = () => {

    const navbar = ['О нас', 'Новости', 'Акции', 'Продукты', 'Статьи', 'Доставка и оплата', 'Контакты'];

    const navbarEls = navbar.map((text, ind) => {
        return (
            <li key={ind}>
                <a href="#" className="navbar__link">{text}</a>
            </li>
        );
    })

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
                                <img className="left-side__delivery-image" src="http://localhost:8000/static/store_app/delivery-logo.png"
                                    alt="" />
                                <div className="">
                                    <p className="left-side__delivery">Быстрая доставка</p>
                                    <p className="left-side__delivery">свежих продуктов</p>
                                    <p className="left-side__delivery">По Москве</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="logo" src="http://localhost:8000/static/store_app/1.png" alt="" />
                    <div className="header-upper-part__right-side right-side">
                        <div className="right-side__item">
                            <ul className="user-list">
                                <li className="user-list__item user-list__item--log">
                                    <a id="login-button" className="user-list__link" href="">Вход</a>
                                </li>
                                <li className="user-list__item user-list__item--reg">
                                    <a className="user-list__link" href="">Регистрация</a>
                                </li>
                            </ul>
                            <a href="#" className="right-side__link">Вы недавно смотрели</a>
                            <a href="" id="my-favorites" className="right-side__link">Мои закладки: (<span id="favorites-quantity"></span>)</a>
                        </div>
                        <div className="right-side__item right-side__item--cart">
                            <p className="cart">
                                <a className="cart__link" href="">
                                    <img className="cart__image" src="http://localhost:8000/static/store_app/cart.png" alt="" />
                                КОРЗИНА
                            </a>
                            </p>
                            <div className="cart-order__wrapper">
                                <div>
                                    <p className="cart__paragraph">Товаров:
                                    <span id="cart_count"></span> шт.</p>
                                    <p className="cart__paragraph">Сумма: <span
                                        id="cart-total-sum"></span> руб.</p>
                                </div>
                                <p id="cart__order-button" className="cart__order-button"><span className="">Оформить заказ</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <nav className="header-lower-part">
                <ul className="navbar">
                    {navbarEls}
                </ul>
            </nav>
        </div>
    );
}

export default HeaderMainPart;