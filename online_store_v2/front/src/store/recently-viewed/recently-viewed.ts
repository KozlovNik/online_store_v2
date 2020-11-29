import {
  GET_RECENTLY_VIEWED_FAILURE,
  GET_RECENTLY_VIEWED_REQUEST,
  GET_RECENTLY_VIEWED_SUCCESS,
  ADD_RECENTLY_VIEWED_ITEM_FAILURE,
  ADD_RECENTLY_VIEWED_ITEM_REQUEST,
  ADD_RECENTLY_VIEWED_ITEM_SUCCESS,
  GetRecentlyViewed,
  AddRecentlyViewedItem,
  RecentlyViewed,
  RecentlyViewedTypes,
} from "./types";

const initialState: RecentlyViewed = {
  isLoading: false,
  id: null,
  vieweditems: [],
};

export default function recentlyViewed(
  state = initialState,
  action: RecentlyViewedTypes
): RecentlyViewed {
  switch (action.type) {
    case GET_RECENTLY_VIEWED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECENTLY_VIEWED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    // case GET_PRODUCTS_FAILURE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errors: action.payload,
    //   };
    case ADD_RECENTLY_VIEWED_ITEM_REQUEST:
      return {
        ...state,
      };
    case ADD_RECENTLY_VIEWED_ITEM_SUCCESS:
      return {
        ...state,
        vieweditems: [
          action.payload.item,
          ...state.vieweditems.filter(
            (item) => item.product.id !== action.payload.item.product.id
          ),
        ],
      };
    default:
      return state;
  }
}
