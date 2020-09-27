import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import Products from "../products";
import Sidebar from "../sidebar/sidebar";

import "./product-page.css";

const ProductPage = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="product-page">
      <Router>
        <Sidebar url={url} />
        <Switch>
          <Route exact path={`${path}/`} component={Products} />
          <Route path={`${path}/:category`} component={Products} />
        </Switch>
      </Router>
    </div>
  );
};

export default ProductPage;
