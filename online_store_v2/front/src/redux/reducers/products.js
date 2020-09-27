import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  GET_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART_FAILURE,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  UPDATE_CART_ITEM_SUCCESS,
} from "../action-types";

const initialState = {
  isLoading: false,
  errors: [],
  productsByCategory: [],
  order: {},
  cartId: null,
  cartItems: [],
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsByCategory: action.payload,
        isLoading: false,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItem],
      };
    case DELETE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if ((item.id === action.payload.cartItem.id)) {
            return action.payload.cartItem;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
