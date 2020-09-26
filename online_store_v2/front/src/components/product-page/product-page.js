import React, { useEffect } from "react";

import Sidebar from "../sidebar";
import { useParams } from "react-router-dom";

import "./product-page.css";

const ProductPage = () => {
  return (
    <div className="product-page">
      <Sidebar />
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default ProductPage;
