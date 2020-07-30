import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getUser } from '../../redux/actions';

import Header from '../header';
import ModalLoginWindow from '../modal-login-window';
import RegisterPage from '../register-page';
import SliderPage from '../slider-page';
import ProductPage from '../product-page';

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import './app.css';

const App = ({ getUser }) => {

    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <Router>
            <ModalLoginWindow />
            <Header />
            <div className="app">
                <Switch>
                    <Route
                        exact path="/"
                        component={SliderPage} />
                    <Route
                        path="/register"
                        component={RegisterPage} />
                    <Route
                        path="/products"
                        component={ProductPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default connect(null, { getUser })(App);