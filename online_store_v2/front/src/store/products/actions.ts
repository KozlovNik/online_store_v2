import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  GET_CART_REQUEST,
  GET_CART_FAILURE,
  GET_CART_SUCCESS,
  GetProducts,
  GetCartItems,
  Product,
  AddCartItem,
  DeleteCartItem,
  UpdateCartItem,
  CartItem,
} from "./types";

import { link } from "../../constants";

import { AppThunk } from "../../types";
// import { Category } from "./types";

export const getProducts = (
  category: string | undefined
): AppThunk<GetProducts> => (dispatch, getState) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  let cPage: number;
  console.log("wrf");
  if (
    getState().products.curPage === 1 ||
    getState().products.curCategory !== category
  ) {
    cPage = 1;
  } else {
    cPage = getState().products.curPage;
  }
  axios
    .get(`${link}products/`, {
      params: { category, page: cPage },
    })
    .then((res) => {
      let products, curPage;

      if (cPage === 1) {
        products = res.data.results;
      } else {
        products = [
          ...getState().products.productsByCategory,
          ...res.data.results,
        ];
      }
      curPage = cPage + 1;
      console.log(curPage);
      let hasMoreItems =
        res.data.next !== null || getState().products.curCategory !== category;
      if (getState().products.curCategory !== category) {
        hasMoreItems = true;
        curPage = 1;
      }
      console.log(getState().products.curCategory, category);

      // console.log(res.data.next !== null);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          next: res.data.next,
          previous: res.data.previous,
          hasMoreItems,
          curCategory: category,
          curPage,
        },
      });
    })
    .catch((err) => {
      let errorsObj: string[];
      if (err.response) {
        errorsObj = Object.values(err.response.data);
      } else {
        errorsObj = ["Проблема с сетью"];
      }
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: errorsObj,
      });
    });
};

export const getCartItems = (): AppThunk<GetCartItems> => (dispatch) => {
  let cartId = localStorage.getItem("cartId");
  dispatch({ type: GET_CART_REQUEST });
  axios
    .get(`${link}cart-items/`, {
      params: {
        cartId,
      },
    })
    .then((res) => {
      const {
        id: cartId,
        items: cartItems,
      }: { id: number; items: CartItem[] } = res.data;
      localStorage.setItem("cartId", cartId.toString());
      // console.log(res.data);
      dispatch({
        type: GET_CART_SUCCESS,
        payload: { cartId, cartItems },
      });
    });
};

export const addCartItem = (slug: string): AppThunk<AddCartItem> => (
  dispatch
) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  let cartId = localStorage.getItem("cartId");

  axios
    .post(`${link}cart-items/`, null, {
      params: {
        cartId,
        slug,
      },
    })
    .then((res) => {
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItem: res.data } });
    });
};

export const deleteCartItem = (id: number): AppThunk<DeleteCartItem> => (
  dispatch
) => {
  dispatch({ type: DELETE_FROM_CART_REQUEST });

  axios.delete(`${link}cart-items/${id}`).then(() => {
    dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: { id } });
  });
};

export const updateCartItem = (
  id: number,
  quantity: number | ""
): AppThunk<UpdateCartItem> => (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  axios
    .put(`${link}cart-items/${id}`, null, {
      params: {
        quantity,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_CART_ITEM_SUCCESS,
        payload: { cartItem: res.data },
      });
    });
};
