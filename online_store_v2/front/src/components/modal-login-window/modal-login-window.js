import React, { useRef } from "react";

import LoginForm from "../login-form";
import LoginCLoseButton from "../login-close-button";

import { connect } from "react-redux";
import { setModalWindow } from "../../redux/actions";

import classNames from "classnames";

import "./modal-login-window.css";

const ModalLoginWindow = ({ loginPopup, setModalWindow, errors }) => {
  const layoutRef = useRef();

  const handleLayoutClick = (e) => {
    if (e.target === layoutRef.current) {
      setModalWindow(false);
    }
  };

  let cl = classNames("modal-login-layout", {
    "modal-login-layout--hidden": !loginPopup,
  });

  return (
    <div className={cl} onClick={handleLayoutClick} ref={layoutRef}>
      <div className="modal-login-window">
        <LoginCLoseButton />
        <div className="modal-login-window__wrapper">
          <p className="modal-login-window__title">АВТОРИЗАЦИЯ</p>
          <p className="modal-login-window__errors">
            {errors && errors.map((el, ind) => <span key={ind}>{el}</span>)}
          </p>
          <LoginForm />
          <button className="login-form__button login-form__button--register">
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginPopup: state.modals.loginPopup,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { setModalWindow })(
  ModalLoginWindow
);
