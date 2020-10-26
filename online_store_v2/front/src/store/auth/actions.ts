import {
  SetLoginModalWindow,
  GetUser,
  User,
  SET_LOGIN_MODAL_WINDOW,
  ADD_TO_LIKES_REQUEST,
  ADD_TO_LIKES_SUCCESS,
  DELETE_FROM_LIKES_REQUEST,
  DELETE_FROM_LIKES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_LOADED,
  GET_USER_LOADING,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_LOGIN_DATA,
  SetLoginData,
  UserData,
  Login,
  AddToLikes,
  DeleteFromLikes,
  Logout,
  Register,
} from "./types";

import axios from "axios";

import { link } from "../../constants";

import { AppThunk } from "../../types";

export const setModalWindow = (data: boolean): SetLoginModalWindow => ({
  type: SET_LOGIN_MODAL_WINDOW,
  payload: data,
});

export const getUser = (): AppThunk<GetUser, GetUser | void> => (dispatch) => {
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
    .then((res) => {
      dispatch({ type: GET_USER_LOADED, payload: res.data });
    })
    .catch(() => dispatch({ type: GET_USER_FAILURE }));
};

export const setLoginData = (
  data: Partial<UserData>
): AppThunk<SetLoginData> => (dispatch) => {
  dispatch({ type: SET_LOGIN_DATA, payload: { ...data } });
};

export const login = (): AppThunk<Login> => (dispatch, getState) => {
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
        const errorsObj: string[] = Object.values(errors);
        dispatch({
          type: LOGIN_FAILURE,
          payload: errorsObj,
        });
      } catch (e) {}
    });
};

export const addToLikes = (id: number): AppThunk<AddToLikes> => (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: ADD_TO_LIKES_REQUEST });

  axios
    .post(`${link}likes/`, null, {
      params: {
        id,
      },
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_TO_LIKES_SUCCESS,
        payload: { id: res.data.id },
      });
    });
};

export const deleteFromLikes = (id: number): AppThunk<DeleteFromLikes> => (
  dispatch
) => {
  const token = localStorage.getItem("token");
  dispatch({ type: DELETE_FROM_LIKES_REQUEST });

  axios
    .delete(`${link}likes/`, {
      params: {
        id,
      },
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(() => {
      dispatch({
        type: DELETE_FROM_LIKES_SUCCESS,
        payload: { id },
      });
    });
};

export const logout = (): AppThunk<Logout> => (dispatch) => {
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
      const errorsObj: string[] = Object.values(data);
      dispatch({
        type: LOGOUT_FAILURE,
        payload: errorsObj,
      });
    });
};

export const register = (
  data: UserData,
  cb: () => void
): AppThunk<Register> => (dispatch) => {
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
        const errorsObj: string[] = Object.values(errors);
        dispatch({
          type: REGISTER_FAILURE,
          payload: errorsObj,
        });
      } catch (e) {}
    });
};
