import {
  ADD_TO_LIKES_SUCCESS,
  AuthActionTypes,
  AuthState,
  DELETE_FROM_LIKES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_LOADED,
  GET_USER_LOADING,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_LOGIN_DATA,
  SET_LOGIN_MODAL_WINDOW,
} from "./types";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  registerErrors: [],
  errors: [],
  user: { email: "", password: "", likes: [] },
  loginPopup: false,
};

export default function auth(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case REGISTER_REQUEST:
    case GET_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errors: [],
        registerErrors: [],
      };
    case GET_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: { ...state.user, ...action.payload },
      };
    case GET_USER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: { ...state.user, email: "", password: "" },
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        registerErrors: action.payload,
        user: { ...state.user, email: "", password: "" },
      };
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errors: action.payload,
      };
    case LOGOUT_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errors: action.payload,
        user: { ...state.user, email: "", password: "" },
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        errors: null,
        registerErrors: null,
        user: { ...state.user, ...action.payload.user },
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        errors: null,
        user: { ...state.user, ...action.payload.user },
      };
    case ADD_TO_LIKES_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          likes: [...state.user.likes, action.payload.id],
        },
      };
    case DELETE_FROM_LIKES_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.filter((el) => el !== action.payload.id),
        },
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errors: [],
        user: { ...state.user, email: "", password: "", likes: [] },
      };
    case SET_LOGIN_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case SET_LOGIN_MODAL_WINDOW: {
      return {
        ...state,
        loginPopup: action.payload,
      };
    }
    default:
      return state;
  }
}
