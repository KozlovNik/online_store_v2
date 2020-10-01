import {
  GET_USER_LOADING,
  GET_USER_LOADED,
  GET_USER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  LOGOUT_FAILURE,
  SET_LOGIN_DATA,
  ADD_TO_LIKES_SUCCESS,
  ADD_TO_LIKES_REQUEST,
  ADD_TO_LIKES_FAILURE,
  DELETE_FROM_LIKES_SUCCESS,
} from "../action-types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  registerErrors: [],
  errors: [],
  user: { email: "", password: "", likes: [] },
};

export default function auth(state = initialState, action) {
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
        user: { email: "", password: "" },
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        registerErrors: action.payload,
        user: { email: "", password: "" },
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
        user: { email: "", password: "" },
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
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          likes: [...state.user.likes, action.payload.id],
        },
      };
    case DELETE_FROM_LIKES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.map((el) => el !== action.payload.id),
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
        user: { email: "", password: "" },
      };
    case SET_LOGIN_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
}
