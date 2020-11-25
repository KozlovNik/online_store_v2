import React, { useState } from "react";

import { Link } from "react-router-dom";
import classNames from "classnames";

import "./sidebar.css";

interface Props {
  url: string;
}

const Sidebar = ({ url }: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <nav className="sidebar">
      <h3
        className="sidebar__header"
        onClick={() => setIsHidden((isHidden) => !isHidden)}
      >
        КАТЕГОРИИ
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
        <li className="sidebar__item">
          <Link className="sidebar__link" to={`${url}/sladosti`}>
            Сладости
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
