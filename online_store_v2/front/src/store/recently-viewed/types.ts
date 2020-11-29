import { Product } from "../products/types";

export const GET_RECENTLY_VIEWED_SUCCESS = "GET_RECENTLY_VIEWED_SUCCESS";
export const GET_RECENTLY_VIEWED_FAILURE = "GET_RECENTLY_VIEWED_FAILURE";
export const GET_RECENTLY_VIEWED_REQUEST = "GET_RECENTLY_VIEWED_REQUEST";
export const ADD_RECENTLY_VIEWED_ITEM_SUCCESS =
  "ADD_RECENTLY_VIEWED_ITEM_SUCCESS";
export const ADD_RECENTLY_VIEWED_ITEM_FAILURE =
  "ADD_RECENTLY_VIEWED_ITEM_FAILURE";
export const ADD_RECENTLY_VIEWED_ITEM_REQUEST =
  "ADD_RECENTLY_VIEWED_ITEM_REQUEST";

export interface RecentlyViewed {
  isLoading: boolean;
  id: number | null;
  vieweditems: { id: number; product: Product }[];
}

interface GetRecentlyViewedRequest {
  type: typeof GET_RECENTLY_VIEWED_REQUEST;
}

interface GetRecentlyViewedSuccess {
  type: typeof GET_RECENTLY_VIEWED_SUCCESS;
  payload: {
    id: number;
    vieweditems: { id: number; product: Product }[];
  };
}

export type GetRecentlyViewed =
  | GetRecentlyViewedRequest
  | GetRecentlyViewedSuccess;

interface AddRecentlyViewedItemRequest {
  type: typeof ADD_RECENTLY_VIEWED_ITEM_REQUEST;
}

interface AddRecentlyViewedItemSuccess {
  type: typeof ADD_RECENTLY_VIEWED_ITEM_SUCCESS;
  payload: {
    item: { id: number; product: Product };
  };
}

export type AddRecentlyViewedItem =
  | AddRecentlyViewedItemSuccess
  | AddRecentlyViewedItemRequest;

export type RecentlyViewedTypes = GetRecentlyViewed | AddRecentlyViewedItem;
