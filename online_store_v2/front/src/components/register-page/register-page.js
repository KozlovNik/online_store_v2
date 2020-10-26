import React, { useState } from 'react';

import { connect } from 'react-redux';
import { register } from '../../store/auth/actions';

import './register-page.css';
import { useHistory } from 'react-router-dom';

const RegisterPage = ({ register, errors }) => {

    let history = useHistory()

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const handleRegisterInputChange = e => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handRegisterFormSubmit = e => {
        e.preventDefault()
        register(registerData, () => { history.push('/') })
    }

    return (
        <form
            className="register-form"
            onSubmit={handRegisterFormSubmit}>
            <h2 className="register-form__title">Регистрация</h2>
            <p className="register-form__errors">{errors && errors.toString()}</p>
            <label className="register-form__label">
                Email
                <input
                    type="email"
                    name="email"
                    className="register-form__input"
                    required
                    onChange={handleRegisterInputChange} />
            </label>
            <label className="register-form__label">
                Пароль
                <input
                    type="password"
                    name="password"
                    className="register-form__input"
                    required
                    onChange={handleRegisterInputChange} />
            </label>
            <label className="register-form__label">
                Пароль
                <input
                    type="password"
                    name="password2"
                    className="register-form__input"
                    required
                    onChange={handleRegisterInputChange} />
            </label>
            <button
                type="submit"
                className="register-form__button">
                Зарегистрироваться</button>
        </form >
    )
}

const mapStateToProps = state => ({
    errors: state.auth.registerErrors
})

export default connect(mapStateToProps, { register })(RegisterPage);
