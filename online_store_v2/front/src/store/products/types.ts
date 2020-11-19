import { DELETE_FROM_LIKES_FAILURE } from "../auth/types";
import { updateCartItem } from "./actions";

export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const DELETE_FROM_CART_REQUEST = "DELETE_FROM_CART_REQUEST";
export const DELETE_FROM_CART_SUCCESS = "DELETE_FROM_CART_SUCCESS";
export const DELETE_FROM_CART_FAILURE = "DELETE_FROM_CART_FAILURE";
export const UPDATE_CART_ITEM_REQUEST = "UPDATE_CART_ITEM_REQUEST";
export const UPDATE_CART_ITEM_SUCCESS = "UPDATE_CART_ITEM_SUCCESS";
export const UPDATE_CART_ITEM_FAILURE = "UPDATE_CART_ITEM_FAILURE";
export const GET_CART_REQUEST = "GET_CART_REQUEST";
export const GET_CART_FAILURE = "GET_CART_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";

export interface Category {
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
  brand: string | null;
  category: Category;
  isProductLoading: boolean;
}

export interface CartItem {
  id: number;
  item_total: string;
  quantity: number;
  product: Product;
  isItemLoading: boolean;
}

export interface Cart {
  cartId: number | null;
  cartItems: CartItem[];
}

export interface Products extends Cart {
  isLoading: boolean;
  errors: string[];
  productsByCategory: Product[];
  order: {};
  next: string | null;
  hasMoreItems: boolean;
  curPage: number;
  curCategory: string | undefined;
}

interface GetProductsRequest {
  type: typeof GET_PRODUCTS_REQUEST;
}

// "count": 13,
//     "next": "http://127.0.0.1:8000/api/products/?page=2",
//     "previous": null,
//     "results": [

export interface ProductAPI {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

interface GetProductsSuccess {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: {
    products: Product[];
    next: string | null;
    hasMoreItems: boolean;
    curPage: number;
    curCategory: string | undefined;
  };
}

interface GetProductsFailure {
  type: typeof GET_PRODUCTS_FAILURE;
  payload: string[];
}

export type GetProducts =
  | GetProductsFailure
  | GetProductsRequest
  | GetProductsSuccess;

interface GetCartItemsRequest {
  type: typeof GET_CART_REQUEST;
}

interface GetCartItemsSuccess {
  type: typeof GET_CART_SUCCESS;
  payload: Cart;
}

interface GetCartItemsFailure {
  type: typeof GET_CART_FAILURE;
}

export type GetCartItems =
  | GetCartItemsSuccess
  | GetCartItemsFailure
  | GetCartItemsRequest;

interface AddCartItemRequest {
  type: typeof ADD_TO_CART_REQUEST;
  payload: {
    slug: string;
  };
}

interface AddCartItemSuccess {
  type: typeof ADD_TO_CART_SUCCESS;
  payload: {
    cartItem: CartItem;
    slug: string;
  };
}

interface AddCartItemFailure {
  type: typeof ADD_TO_CART_FAILURE;
  payload: { slug: string };
}

export type AddCartItem =
  | AddCartItemFailure
  | AddCartItemSuccess
  | AddCartItemRequest;

interface DeleteCartItemRequest {
  type: typeof DELETE_FROM_CART_REQUEST;
  payload: { id: number };
}

interface DeleteCartItemSuccess {
  type: typeof DELETE_FROM_CART_SUCCESS;
  payload: {
    id: number;
  };
}

interface DeleteCartItemFailure {
  type: typeof DELETE_FROM_CART_FAILURE;
  payload: {
    id: number;
  };
}

export type DeleteCartItem =
  | DeleteCartItemSuccess
  | DeleteCartItemFailure
  | DeleteCartItemRequest;

interface UpdateCartItemRequest {
  type: typeof UPDATE_CART_ITEM_REQUEST;
  payload: {
    id: number;
  };
}

interface UpdateCartItemSuccess {
  type: typeof UPDATE_CART_ITEM_SUCCESS;
  payload: {
    cartItem: CartItem;
  };
}

interface UpdateCartItemFailure {
  type: typeof UPDATE_CART_ITEM_FAILURE;
  payload: {
    id: number;
  };
}

export type UpdateCartItem =
  | UpdateCartItemSuccess
  | UpdateCartItemRequest
  | UpdateCartItemFailure;

export type ProductsActionTypes =
  | GetProducts
  | GetCartItems
  | AddCartItem
  | DeleteCartItem
  | UpdateCartItem;

// export const SEND_MESSAGE = 'SEND_MESSAGE'
// export const DELETE_MESSAGE = 'DELETE_MESSAGE'

// interface SendMessageAction {
//   type: typeof SEND_MESSAGE
//   payload: Message
// }

// interface DeleteMessageAction {
//   type: typeof DELETE_MESSAGE
//   meta: {
//     timestamp: number
//   }
// }

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction
