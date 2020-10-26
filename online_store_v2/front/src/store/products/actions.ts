import axios from "axios";
import {
  Products,
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
} from "./types";

import { link } from "../../constants";

import { AppThunk } from "../../types";
import { Category } from "./types";

export const getProducts = (category: Category): AppThunk<GetProducts> => (
  dispatch
) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  axios
    .get(`${link}products/`, {
      params: { category },
    })
    .then((res) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data.results });
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
      }: { id: number; items: Product[] } = res.data;
      localStorage.setItem("cartId", cartId.toString());
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
  quantity: number
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
