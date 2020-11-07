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
  const {
    productsByCategory,
    getProducts,
    errors,
    next,
    previous,
    hasMoreItems,
    curPage,
  } = props;
  let { category } = useParams<RouteParams>();
  console.log(hasMoreItems);
  useEffect(() => {
    getProducts(category);
  }, [category, getProducts]);
  // if (errors.length > 0) {
  //   el = <p>error</p>;
  // } else if (isLoading) {
  //   el = <Spinner />;
  // } else {
  const loadItems = () => {
    // console.log(next !== null);
    getProducts(category);
  };
  let el = (
    <div className="catalog-wrapper">
      {productsByCategory.map(
        ({ image, name, price, slug, category, available }) => {
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
              <AddToCart slug={slug} available={available} />
            </div>
          );
        }
      )}
    </div>
  );
  // }
  // console.log("wtf");
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadItems}
      hasMore={hasMoreItems}
      loader={<Spinner />}
    >
      {el}
    </InfiniteScroll>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    productsByCategory: state.products.productsByCategory,
    // isLoading: state.products.isLoading,
    errors: state.products.errors,
    next: state.products.next,
    previous: state.products.previous,
    hasMoreItems: state.products.hasMoreItems,
    curPage: state.products.curPage,
  };
};

const connector = connect(mapStateToProps, { getProducts });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface RouteParams {
  category: string | undefined;
}

export default connector(Products);
