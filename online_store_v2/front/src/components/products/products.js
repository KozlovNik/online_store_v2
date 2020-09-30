import React, { useEffect } from "react";

import "./products.css";

import AddToCart from "../add-to-cart";

import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions";

const Products = ({ productsByCategory, getProducts }) => {
  let { category } = useParams();

  useEffect(() => {
    getProducts(category);
  }, [category, getProducts]);

  return (
    <div className="catalog-wrapper">
      {productsByCategory.map(({ image, name, price, slug, category }) => {
        return (
          <div className="product" key={slug}>
            <div className="product__image-wrapper">
              <Link
                to={`/products/${category.slug}/${slug}`}
                className="product__image-link"
              >
                <img src={image} className="product__image" alt="" />
              </Link>
            </div>
            <div className="product__rating"></div>
            <div className="product__title">
              <Link
                to={`/products/${category.slug}/${slug}`}
                className="product__title-link"
              >
                {name}
              </Link>
            </div>
            <div className="product__price">
              <b>{price} рублей</b>
            </div>
            <AddToCart slug={slug} />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsByCategory: state.products.productsByCategory,
  };
};

export default connect(mapStateToProps, { getProducts })(Products);
