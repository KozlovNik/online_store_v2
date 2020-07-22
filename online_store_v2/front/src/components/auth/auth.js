import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { setLoginModalWindow, logout } from '../../redux/actions';

import { Link } from 'react-router-dom'

import './auth.css';

const Auth = ({ setLoginModalWindow, isAuthenticated, isLoading, logout }) => {

    const handleLoginButtonClick = e => {
        e.preventDefault();
        setLoginModalWindow(true);
    }

    const handleLogoutButtonCLick = e => {
        logout()
        e.preventDefault()
    }

    let authValue

    if (isAuthenticated) {
        authValue = (
            <li className="auth-list__item">
                <button
                    className="auth-list__button"
                    onClick={handleLogoutButtonCLick}>Выйти</button>
            </li>
        )
    } else if (!isAuthenticated && !isLoading) {
        authValue = (
            <Fragment>
                <li className="auth-list__item">
                    <button
                        className="auth-list__button"
                        onClick={handleLoginButtonClick}>Вход</button>
                </li>
                <li className="auth-list__item">
                    <Link to="/register">
                        <button className="auth-list__button auth-list__button--reg">
                            Регистрация
                        </button>
                    </Link>
                </li>
            </Fragment>
        )
    }

    return <ul className="auth-list">{authValue}</ul>
}

const mapStateToProps = state => {
    const { isLoading, isAuthenticated } = state.auth
    return { isLoading, isAuthenticated }
}

export default connect(mapStateToProps, { setLoginModalWindow, logout })(Auth);