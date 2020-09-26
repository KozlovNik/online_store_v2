import React from "react";

import Products from "../products";

import "./sidebar.css";
import {
  Link,
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

const Sidebar = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <nav className="sidebar">
        <h3 className="sidebar__header">Категории</h3>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to={`${url}/napitki`}>
              Напитки
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to={`${url}/poleznyj-zavtrak`}>
              Полезный завтрак
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Switch>
          <Route exact path={`${path}/`} component={Products} />
          <Route path={`${path}/:category`} component={Products} />
        </Switch>
      </div>
    </Router>
  );
};

export default Sidebar;
