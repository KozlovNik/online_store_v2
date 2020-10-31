import React, { useState } from "react";

import { connect, ConnectedProps } from "react-redux";
import { register } from "../../store/auth/actions";

import "./register-page.css";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const RegisterPage = ({ register, errors }: PropsFromRedux) => {
  let history = useHistory();

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(registerData, () => {
      history.push("/");
    });
  };

  return (
    <form className="register-form" onSubmit={handRegisterFormSubmit}>
      <h2 className="register-form__title">Регистрация</h2>
      <p className="register-form__errors">{errors && errors.toString()}</p>
      <label className="register-form__label">
        Email
        <input
          type="email"
          name="email"
          className="register-form__input"
          required
          onChange={handleRegisterInputChange}
        />
      </label>
      <label className="register-form__label">
        Пароль
        <input
          type="password"
          name="password"
          className="register-form__input"
          required
          onChange={handleRegisterInputChange}
        />
      </label>
      <label className="register-form__label">
        Пароль
        <input
          type="password"
          name="password2"
          className="register-form__input"
          required
          onChange={handleRegisterInputChange}
        />
      </label>
      <button type="submit" className="register-form__button">
        Зарегистрироваться
      </button>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  errors: state.auth.registerErrors,
});

const connector = connect(mapStateToProps, { register });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegisterPage);
