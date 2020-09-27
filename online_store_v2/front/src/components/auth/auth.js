import React, { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import { setModalWindow, logout } from "../../redux/actions";

import LabelBlock from "../label-block";
import GenericButton from "../generic-button";

import "./auth.css";

const Auth = ({
  setModalWindow,
  isAuthenticated,
  isLoading,
  logout,
  isClose,
  setIsClose,
}) => {
  const auth = useRef();
  const label = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (event.target !== auth.current && event.target !== label.current) {
        setIsClose(true);
      }
    };

    document.addEventListener("mouseup", maybeHandler);

    return () => {
      document.removeEventListener("mouseup", maybeHandler);
    };
  });

  const handleLoginButtonClick = (e) => {
    e.preventDefault();
    setModalWindow(true);
  };

  const handleLogoutButtonCLick = (e) => {
    logout();
    e.preventDefault();
  };

  let authValue;

  if (isAuthenticated) {
    authValue = (
      <GenericButton
        clsName="orange"
        label="Выйти"
        handleClick={handleLogoutButtonCLick}
      />
    );
  } else if (!isAuthenticated && !isLoading) {
    authValue = (
      <Fragment>
        <GenericButton
          clsName="orange"
          label="Вход"
          handleClick={handleLoginButtonClick}
        />
        <Link to="/register">
          <GenericButton clsName="green" label="Регистрация" />
        </Link>
      </Fragment>
    );
  }

  return (
    <div
      ref={auth}
      className={classNames("auth-list", {
        "auth-list--hidden": isClose,
      })}
    >
      <LabelBlock ref={label} label="Личный кабинет" handleClick={setIsClose} />
      {authValue}
      <a href="/#" className="profile-block__link">
        Вы недавно смотрели
      </a>

      <a href="/#" className="profile-block__link">
        Мои закладки: <span></span>
      </a>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isLoading, isAuthenticated } = state.auth;
  return { isLoading, isAuthenticated };
};

export default connect(mapStateToProps, { setModalWindow, logout })(Auth);
