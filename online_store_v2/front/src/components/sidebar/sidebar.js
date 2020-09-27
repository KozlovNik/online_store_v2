import React, { useState } from "react";

import { Link } from "react-router-dom";
import classNames from "classnames";

import "./sidebar.css";

const Sidebar = ({ url }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <nav className="sidebar">
      <h3
        className="sidebar__header"
        onClick={() => setIsHidden((isHidden) => !isHidden)}
      >
        Категории{" "}
        <span
          className={classNames("sidebar__header-arrow", {
            "sidebar__header-arrow--reverse": isHidden,
          })}
        ></span>
      </h3>
      <ul
        className={classNames("sidebar__list", {
          "sidebar__list--hidden": isHidden,
        })}
      >
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
  );
};

export default Sidebar;
