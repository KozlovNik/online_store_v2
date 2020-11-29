import axios from "axios";
import {
  GetRecentlyViewed,
  GET_RECENTLY_VIEWED_REQUEST,
  GET_RECENTLY_VIEWED_SUCCESS,
  AddRecentlyViewedItem,
  ADD_RECENTLY_VIEWED_ITEM_REQUEST,
  ADD_RECENTLY_VIEWED_ITEM_SUCCESS,
} from "./types";

import { link } from "../../constants";
import { AppThunk } from "../../types";

export const getRecentlyViewed = (): AppThunk<GetRecentlyViewed> => (
  dispatch
) => {
  let id = localStorage.getItem("id");
  dispatch({ type: GET_RECENTLY_VIEWED_REQUEST });
  axios
    .get(`${link}recently-viewed/`, {
      params: {
        id,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (id === null) {
        localStorage.setItem("id", res.data.id);
      }
      dispatch({ type: GET_RECENTLY_VIEWED_SUCCESS, payload: { ...res.data } });
    });
};

export const addRecentlyViewedItem = (
  viewedId: number
): AppThunk<AddRecentlyViewedItem> => (dispatch) => {
  let id = localStorage.getItem("id");
  axios
    .post(`${link}recently-viewed/`, null, {
      params: {
        viewedId,
        id,
      },
    })
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: ADD_RECENTLY_VIEWED_ITEM_SUCCESS,
        payload: { item: res.data },
      });
    });
};
