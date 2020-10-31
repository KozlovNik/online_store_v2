import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import Products from "../products";
import Product from "../product";
import Sidebar from "../sidebar";

import "./product-page.css";

const ProductPage = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="product-page">
      <Router>
        <Switch>
          <Route exact path={`${path}/`}>
            <Sidebar url={url} />
            <Products />
          </Route>

          <Route exact path={`${path}/:category`}>
            <Sidebar url={url} />
            <Products />
          </Route>

          <Route path={`${path}/:category/:product`} component={Product} />
        </Switch>
      </Router>
    </div>
  );
};

export default ProductPage;
