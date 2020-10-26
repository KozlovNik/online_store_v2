export const GET_USER_LOADING = "GET_USER_LOADING";
export const GET_USER_LOADED = "GET_USER_LOADED";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const ADD_TO_LIKES_SUCCESS = "ADD_TO_LIKES_SUCCESS";
export const ADD_TO_LIKES_FAILURE = "ADD_TO_LIKES_FAILURE";
export const ADD_TO_LIKES_REQUEST = "ADD_TO_LIKES_REQUEST";
export const DELETE_FROM_LIKES_SUCCESS = "DELETE_FROM_LIKES_SUCCESS";
export const DELETE_FROM_LIKES_FAILURE = "DELETE_FROM_LIKES_FAILURE";
export const DELETE_FROM_LIKES_REQUEST = "DELETE_FROM_LIKES_REQUEST";
export const SET_LOGIN_MODAL_WINDOW = "SET_LOGIN_MODAL_WINDOW";

export interface UserData {
  email: string;
  password: string;
}

export interface User extends UserData {
  likes: number[];
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registerErrors: string[] | null;
  errors: string[] | null;
  user: User;
  loginPopup: boolean;
}

export interface SetLoginModalWindow {
  type: typeof SET_LOGIN_MODAL_WINDOW;
  payload: boolean;
}

interface GetUserLoading {
  type: typeof GET_USER_LOADING;
}

interface GetUserFailure {
  type: typeof GET_USER_FAILURE;
}

interface GetUserLoaded {
  type: typeof GET_USER_LOADED;
  payload: User;
}

export type GetUser = GetUserFailure | GetUserLoaded | GetUserLoading;

export interface SetLoginData {
  type: typeof SET_LOGIN_DATA;
  payload: Partial<UserData>;
}

interface LoginLoading {
  type: typeof LOGIN_LOADING;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: string[];
}

export type Login =
  | LoginFailure
  | LoginLoading
  | LoginSuccess
  | SetLoginModalWindow;

interface AddToLikesRequest {
  type: typeof ADD_TO_LIKES_REQUEST;
}

interface AddToLikesSuccess {
  type: typeof ADD_TO_LIKES_SUCCESS;
  payload: {
    id: number;
  };
}

interface AddToLikesFailure {
  type: typeof ADD_TO_LIKES_FAILURE;
}

export type AddToLikes =
  | AddToLikesFailure
  | AddToLikesRequest
  | AddToLikesSuccess;

interface DeleteFromLikesRequest {
  type: typeof DELETE_FROM_LIKES_REQUEST;
}

interface DeleteFromLikesSuccuss {
  type: typeof DELETE_FROM_LIKES_SUCCESS;
  payload: {
    id: number;
  };
}

interface DeleteFromLikesFailure {
  type: typeof DELETE_FROM_LIKES_FAILURE;
  payload: string[];
}

export type DeleteFromLikes =
  | DeleteFromLikesSuccuss
  | DeleteFromLikesFailure
  | DeleteFromLikesRequest;

interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailure {
  type: typeof LOGOUT_FAILURE;
  payload: string[];
}

export type Logout = LogoutFailure | LogoutSuccess;

interface RegisterRequest {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
}

interface RegisterFailure {
  type: typeof REGISTER_FAILURE;
  payload: string[];
}

export type Register = RegisterFailure | RegisterRequest | RegisterSuccess;

export type AuthActionTypes =
  | SetLoginModalWindow
  | GetUser
  | SetLoginData
  | Login
  | AddToLikes
  | DeleteFromLikes
  | Logout
  | Register;
