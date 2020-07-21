import React, { useState } from 'react';

import { connect } from 'react-redux';
import { login } from '../../redux/actions';

import './login-form.css';

const LoginForm = ({ login }) => {

    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleLoginInputChange = e => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handLoginFormSubmit = e => {
        e.preventDefault()
        login(loginData)
    }

    return (
        <form
            className="login-form"
            onSubmit={handLoginFormSubmit}>
            <input
                type="email"
                name="email"
                className="login-form__input"
                placeholder="Email"
                required
                onChange={handleLoginInputChange} />
            <input
                type="password"
                name="password"
                className="login-form__input"
                placeholder="Пароль"
                required
                onChange={handleLoginInputChange} />
            <p className="login-form__paragraph">Забыли пароль?</p>
            <button
                type="submit"
                className="login-form__button">Войти</button>
        </form>
    )
}

export default connect(null, { login })(LoginForm);
