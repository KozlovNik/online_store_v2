import React from "react";

import "./products.css";

import AddToCart from "../add-to-cart";

import { useParams, Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { getProducts } from "../../store/products/actions";
import { RootState } from "../../store";
import Spinner from "../spinner";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect } from "react";

const Products: React.FC<PropsFromRedux> = (props) => {
  const { productsByCategory, getProducts, hasMoreItems } = props;
  let { category } = useParams<RouteParams>();
  useEffect(() => {
    getProducts(category);
  }, [category, getProducts]);

  const loadItems = () => {
    getProducts(category);
  };
  let el = (
    <div className="catalog-wrapper">
      {productsByCategory.map(
        ({ image, name, price, slug, category, available, isProductLoading }) => {
          console.log(isProductLoading)
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
              <AddToCart slug={slug} available={available} isProductLoading={isProductLoading} />
            </div>
          );
        }
      )}
    </div>
  );
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadItems}
      hasMore={hasMoreItems}
      loader={<Spinner key={0} />}
    >
      {el}
    </InfiniteScroll>
  );
};

const mapStateToProps = (state: RootState) => {
  const { productsByCategory, hasMoreItems } = state.products;

  return {
    productsByCategory,
    hasMoreItems,
  };
};

const connector = connect(mapStateToProps, { getProducts });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface RouteParams {
  category: string | undefined;
}

export default connector(Products);
