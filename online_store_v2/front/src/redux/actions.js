import {
  SET_LOGIN_MODAL_WINDOW,
  GET_USER_LOADING,
  GET_USER_LOADED,
  GET_USER_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  SET_LOGIN_DATA,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART_FAILURE,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_FAILURE, 
  UPDATE_CART_ITEM_SUCCESS
} from "../redux/action-types";
import axios from "axios";

const link = "http://127.0.0.1:8000/api/";

export const setModalWindow = (data) => ({
  type: SET_LOGIN_MODAL_WINDOW,
  payload: data,
});

export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_LOADING });

  const token = localStorage.getItem("token");
  if (!token) {
    return dispatch({ type: GET_USER_FAILURE });
  }

  axios
    .post(`${link}accounts/user/`, null, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((res) => dispatch({ type: GET_USER_LOADED, payload: res.data }))
    .catch(() => dispatch({ type: GET_USER_FAILURE }));
};

export const setLoginData = (data) => (dispatch) => {
  return dispatch({ type: SET_LOGIN_DATA, payload: data });
};

export const login = () => (dispatch, getState) => {
  const user = getState().auth.user;
  dispatch({ type: LOGIN_LOADING });

  axios
    .post(`${link}accounts/login/`, user)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(setModalWindow(false));
    })
    .catch((err) => {
      try {
        const errors = err.response.data;
        const errorsObj = Object.values(errors);
        dispatch({
          type: LOGIN_FAILURE,
          payload: errorsObj,
        });
      } catch (e) {}
    });
};

export const logout = () => (dispatch) => {
  const token = localStorage.getItem("token");

  axios
    .post(`${link}accounts/logout/`, null, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      const { data, status } = err.response;
      if (status === 401) {
        return dispatch({ type: LOGOUT_SUCCESS });
      }
      const errorsObj = Object.values(data);
      dispatch({
        type: LOGOUT_FAILURE,
        payload: errorsObj,
      });
    });
};

export const register = (data, cb) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  axios
    .post(`${link}accounts/register/`, data)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      cb();
    })
    .catch((err) => {
      try {
        const errors = err.response.data;
        const errorsObj = Object.values(errors);
        dispatch({
          type: REGISTER_FAILURE,
          payload: errorsObj,
        });
      } catch (e) {}
    });
};

export const getProducts = (category) => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  axios
    .get(`${link}products/`, {
      params: { category },
    })
    .then((res) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data.results });
    });
};

export const getCartItems = () => (dispatch) => {
  let cartId = localStorage.getItem("cartId");
  dispatch({ type: GET_CART_REQUEST });

  axios
    .get(`${link}cart-items/`, {
      params: {
        cartId,
      },
    })
    .then((res) => {
      const { id: cartId, items: cartItems } = res.data;
      localStorage.setItem("cartId", cartId);
      dispatch({
        type: GET_CART_SUCCESS,
        payload: { cartId, cartItems },
      });
    });
};

export const addCartItem = (slug) => (dispatch) => {
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

export const deleteCartItem = (id) => (dispatch) => {
  dispatch({ type: DELETE_FROM_CART_REQUEST });

  axios.delete(`${link}cart-items/${id}`).then(() => {
    dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: { id } });
  });
};

export const updateCartItem = (id, quantity) => (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  axios
    .put(`${link}cart-items/${id}`, null, {
      params: {
        quantity,
      },
    })
    .then((res) => {
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: { cartItem: res.data } });
    });
};