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
        <svg
          className="profile-block__img"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3.5C12 3.5 8.61972 0 6 0C3.38028 0 0 3.5 0 3.5C0 3.5 3.38028 7 6 7C8.61972 7 12 3.5 12 3.5ZM5.99998 5.83333C7.32546 5.83333 8.39998 4.78866 8.39998 3.5C8.39998 2.21134 7.32546 1.16667 5.99998 1.16667C4.67449 1.16667 3.59998 2.21134 3.59998 3.5C3.59998 4.78866 4.67449 5.83333 5.99998 5.83333Z"
            fill="#929B3D"
          />
          <ellipse cx="5.99999" cy="3.5" rx="1.2" ry="1.16667" fill="#929B3D" />
        </svg>
        Вы недавно смотрели
      </a>

      <a
        onClick={handleLikesButtonClick}
        href="/#"
        className="profile-block__link"
      >
        <svg
          className="profile-block__img"
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 9.71429C7.04488 9.33093 12 7.34294 12 4.11889C12 0.51486 10.0948 0 8.66586 0C7.55105 0 6.43626 0.705093 6 1.0151V9.71429Z"
            fill="#EB3D3D"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 9.71429C4.95512 9.33093 8.58307e-06 7.34294 -1.38283e-05 4.11889C-3.8147e-05 0.51486 1.9052 0 3.33414 0C4.44895 0 5.56374 0.705093 6 1.0151V9.71429Z"
            fill="#EB3D3D"
          />
        </svg>
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
