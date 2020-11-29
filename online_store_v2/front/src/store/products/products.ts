import {
  Products,
  ProductsActionTypes,
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
  ADD_TO_CART_FAILURE,
} from "./types";

const initialState: Products = {
  isLoading: false,
  errors: [],
  productsByCategory: [],
  order: {},
  cartId: null,
  cartItems: [],
  next: null,
  hasMoreItems: false,
  curPage: 1,
  curCategory: "",
};

export default function products(
  state = initialState,
  action: ProductsActionTypes
): Products {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsByCategory: action.payload.products,
        next: action.payload.next,
        hasMoreItems: action.payload.hasMoreItems,
        isLoading: false,
        curCategory: action.payload.curCategory,
        curPage: action.payload.curPage,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case GET_CART_SUCCESS:
      let { cartId, cartItems } = action.payload;

      return {
        ...state,
        cartId,
        cartItems: cartItems.map((item) => {
          return { ...item, isItemLoading: false };
        }),
      };
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        productsByCategory: state.productsByCategory.map((product) => {
          if (product.slug === action.payload.slug) {
            return { ...product, isProductLoading: true };
          }
          return product;
        }),
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        productsByCategory: state.productsByCategory.map((product) => {
          if (product.slug === action.payload.slug) {
            return { ...product, isProductLoading: false };
          }
          return product;
        }),
        cartItems: [...state.cartItems, action.payload.cartItem],
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        productsByCategory: state.productsByCategory.map((product) => {
          if (product.slug === action.payload.slug) {
            return { ...product, isProductLoading: false };
          }
          return product;
        }),
      };
    case DELETE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case DELETE_FROM_CART_FAILURE: {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isItemLoading: false };
          }
          return item;
        }),
      };
    }

    case DELETE_FROM_CART_REQUEST: {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isItemLoading: true };
          }
          return item;
        }),
      };
    }

    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isItemLoading: true };
          }
          return item;
        }),
      };

    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isItemLoading: false };
          }
          return item;
        }),
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.cartItem.id) {
            return action.payload.cartItem;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
