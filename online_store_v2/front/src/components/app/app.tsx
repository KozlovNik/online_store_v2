import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../store/auth/actions";
import { getCartItems } from "../../store/products/actions";
import { getRecentlyViewed } from "../../store/recently-viewed/actions";

import Header from "../header";
import ModalLoginWindow from "../modal-login-window";
import RegisterPage from "../register-page";
import SliderPage from "../slider-page";
import ProductPage from "../product-page";
import CartPage from "../cart-page";

import "./app.css";
import Footer from "../footer";

interface AppInterface {
  getUser: Function;
  getCartItems: Function;
  getRecentlyViewed: Function;
}

const App: React.FC<AppInterface> = ({
  getUser,
  getCartItems,
  getRecentlyViewed,
}) => {
  useEffect(() => {
    getUser();
    getCartItems();
    getRecentlyViewed();
  }, [getUser, getCartItems]);

  return (
    <Router>
      <ModalLoginWindow />
      <Header />
      <div className="app">
        <Switch>
          <Route exact path="/" component={SliderPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/products" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default connect(null, { getUser, getCartItems, getRecentlyViewed })(App);
