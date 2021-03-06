import React from "react";

import { Link } from "react-router-dom";

import "./breadcrumbs.css";

interface BreadcrumbsInterface {
  category: {
    name: string;
    slug: string;
  };
  name: string;
}

const Breadcrumbs: React.FC<BreadcrumbsInterface> = ({ category, name }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__item">
        Главная
      </Link>
      {" • "}
      <Link to="/products/" className="breadcrumbs__item">
        Продукты
      </Link>
      {" • "}
      <Link to={`/products/${category.slug}`} className="breadcrumbs__item">
        {category.name}
      </Link>
      {name && <span>{` • ${name}`}</span>}
    </div>
  );
};

export default Breadcrumbs;
