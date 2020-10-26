import React from "react";

import { connect } from "react-redux";
import { login, setLoginData } from "../../store/auth/actions";

import "./login-form.css";

const LoginForm = ({ login, email, password, setLoginData }) => {

  const handleLoginInputChange = (e) => {
      
    setLoginData({
      [e.target.name]: e.target.value,
    });
  };

  const handLoginFormSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <form className="login-form" onSubmit={handLoginFormSubmit}>
      <input
        type="email"
        name="email"
        className="login-form__input"
        placeholder="Email"
        required
        onChange={handleLoginInputChange}
        value={email}
      />
      <input
        type="password"
        name="password"
        className="login-form__input"
        placeholder="Пароль"
        required
        onChange={handleLoginInputChange}
        value={password}
      />
      <p className="login-form__paragraph">Забыли пароль?</p>
      <button type="submit" className="login-form__button">
        Войти
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { email, password } = state.auth.user;
  return {
    email,
    password,
  };
};

export default connect(mapStateToProps, { login, setLoginData })(LoginForm);
