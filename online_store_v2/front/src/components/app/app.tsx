import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../store/auth/actions";
import { getCartItems } from "../../store/products/actions";

import Header from "../header";
import ModalLoginWindow from "../modal-login-window";
import RegisterPage from "../register-page";
import SliderPage from "../slider-page";
import ProductPage from "../product-page";
import CartPage from "../cart-page";
import Spinner from "../spinner";

import "./app.css";

interface AppInterface {
  getUser: Function;
  getCartItems: Function;
}

const App: React.FC<AppInterface> = ({ getUser, getCartItems }) => {
  useEffect(() => {
    getUser();
    getCartItems();
  }, [getUser, getCartItems]);

  return (
    <Router>
      <ModalLoginWindow />
      <Header />
      <div className="app">
        <Spinner />
        <Switch>
          <Route exact path="/" component={SliderPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/products" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { getUser, getCartItems })(App);
