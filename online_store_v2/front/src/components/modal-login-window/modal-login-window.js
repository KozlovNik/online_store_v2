import React, { useRef } from 'react';

import LoginForm from '../login-form';
import LoginCLoseButton from '../login-close-button';

import { connect } from 'react-redux';
import { setLoginModalWindow } from '../../redux/actions';

import './modal-login-window.css';

const ModalLoginWindow = ({ loginPopup, setLoginModalWindow, errors }) => {

    const layoutRef = useRef();

    const handleLayoutClick = e => {
        if (e.target === layoutRef.current){
            setLoginModalWindow(false);
        }
    }

    return loginPopup
        ? <div
            className="modal-login-layout"
            onClick={handleLayoutClick}
            ref={layoutRef}>
            <div className="popup-login-window">
                <LoginCLoseButton />
                <div className="popup-login-window__wrapper">
                    <p className="popup-login-window__title">АВТОРИЗАЦИЯ</p>
                    <p className="popup-login-window__errors">
                        {
                            errors && errors.map((el, ind) =>
                                <span key={ind}>{el[0]}</span>)
                        }
                    </p>
                    <LoginForm />
                    <button className="login-form__button login-form__button--register">Регистрация</button>
                </div>
            </div>
        </div>
        : null

}

const mapStateToProps = state => ({
    loginPopup: state.modals.loginPopup,
    errors: state.auth.errors
});

export default connect(mapStateToProps, { setLoginModalWindow })(ModalLoginWindow);