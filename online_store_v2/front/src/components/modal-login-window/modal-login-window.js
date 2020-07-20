import React from 'react';

import { connect } from 'react-redux';
import { setLoginModalWindow } from '../../redux/actions';

import './modal-login-window.css';

const ModalLoginWindow = ({ loginPopup, setLoginModalWindow }) => {

    return loginPopup
        ? <div className="modal-login-layout">
            <div className="popup-login-window">
                <div
                    className="flag"
                    onClick={() => setLoginModalWindow(false)}>
                    <div className="popup-login-window__close-button">
                    </div>
                </div>
                <div className="popup-login-window__wrapper">
                    <p className="popup-login-window__title">АВТОРИЗАЦИЯ</p>
                    <form className="login-form">
                        <p className="login-form__errors"></p>
                        <input
                            type="text"
                            className="login-form__input"
                            placeholder="Логин" />
                        <input
                            type="password"
                            className="login-form__input"
                            placeholder="Пароль" />
                        <p className="login-form__paragraph">Забыли пароль?</p>
                        <button className="login-form__button">Войти</button>
                        <button className="login-form__button login-form__button--register">Регистрация</button>
                    </form>
                </div>
            </div>
        </div>
        : null

}

const mapStateToProps = state => ({ loginPopup: state.modals.loginPopup });

export default connect(mapStateToProps, { setLoginModalWindow })(ModalLoginWindow);