import React from "react";
import Popup from "reactjs-popup";
import "./products-popup.css";
import { RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import classNames from "classnames";
import eye from "../svgs/eye.svg";
import heart from "../svgs/heart.svg";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

function Thumb() {
  const style = {
    backgroundColor: "#db5657",
    width: "8px",
    position: "relative" as "relative",
    cursor: "pointer",
  };

  return (
    <div style={{ ...style }}>
      <div className="thumb__wrapper">
        <span className="thumb__hr"></span>
        <span className="thumb__hr"></span>
        <span className="thumb__hr"></span>
      </div>
    </div>
  );
}

const ProductsPopup = (props: PropsFromRedux) => {
  const cartItems = props.products.cartItems;
  return (
    <Popup
      trigger={
        <a className="profile-block__link">
          <img src={eye} className="profile-block__img" />
          Вы недавно смотрели
        </a>
      }
      position="bottom left"
      on={["hover", "focus"]}
      arrow={true}
    >
      <Scrollbars
        renderThumbVertical={Thumb}
        className="products-popup"
        hideTracksWhenNotNeeded={true}
      >
        {cartItems.map((item, index, arr) => {
          const { image, name, price, slug, category } = item.product;
          return (
            <div
              className={classNames("products-popup-item", {
                "products-popup-item--last": index === arr.length - 1,
              })}
            >
              <Link to={`/products/${category.slug}/${slug}`}>
                <img className="products-popup-item__image" src={image} />
              </Link>
              <div className="product-popup-item__wrapper">
                <Link to={`/products/${category.slug}/${slug}`}>
                  <p className="products-popup-item__name">{name}</p>
                </Link>
                <p className="products-popup-item__price">{price}</p>
              </div>
              <img src={heart} />
            </div>
          );
        })}
      </Scrollbars>
    </Popup>
  );
};

const mapStateToProps = (state: RootState) => {
  console.log(state);
  return state;
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductsPopup);
