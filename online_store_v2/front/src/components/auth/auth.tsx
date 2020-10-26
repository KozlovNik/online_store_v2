import React, { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import { logout } from "../../store/auth/actions";
import { setModalWindow } from "../../store/auth/actions";

import LabelBlock from "../label-block";
import GenericButton from "../generic-button";

import "./auth.css";

interface AuthInterface {
  setModalWindow: Function;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: Function;
  isClose: boolean;
  setIsClose: (arg: boolean) => void;
}

const Auth: React.FC<AuthInterface> = ({
  setModalWindow,
  isAuthenticated,
  isLoading,
  logout,
  isClose,
  setIsClose,
}) => {
  const auth = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target !== auth.current &&
        target !== label.current &&
        target.parentElement !== label.current
      ) {
        setIsClose(true);
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  const handleLoginButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalWindow(true);
  };

  const handleLogoutButtonCLick = (e: React.MouseEvent) => {
    logout();
    e.preventDefault();
  };

  const handleLikesButtonClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setModalWindow(true);
    }
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
      <LabelBlock
        ref={label}
        label="Личный кабинет"
        handleClick={() => setIsClose(true)}
      />
      {authValue}
      <a href="/#" className="profile-block__link">
        Вы недавно смотрели
      </a>

      <a
        onClick={handleLikesButtonClick}
        href="/#"
        className="profile-block__link"
      >
        Мои закладки: <span></span>
      </a>
    </div>
  );
};

interface mapStateToPropsInterface {
  auth: { isLoading: boolean; isAuthenticated: boolean };
}

const mapStateToProps = <T extends mapStateToPropsInterface>(state: T) => {
  const { isLoading, isAuthenticated } = state.auth;
  return { isLoading, isAuthenticated };
};

export default connect(mapStateToProps, { setModalWindow, logout })(Auth);
