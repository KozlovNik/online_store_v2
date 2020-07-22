import {
    GET_USER_LOADING,
    GET_USER_LOADED,
    GET_USER_FAILURE,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST
} from "../action-types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    registerErrors: [],
    errors: [],
    user: null
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
        case GET_USER_LOADING:
            return {
                ...state,
                isLoading: true,
                errors: [],
                registerErrors: []
            }
        case GET_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case GET_USER_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                registerErrors: action.payload,
                user: null
            }
        case LOGIN_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                errors: action.payload,
                user: null
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                errors: null,
                registerErrors: null,
                user: action.payload.user
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                errors: null,
                user: action.payload.user
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                errors: [],
                user: null
            }
        default:
            return state;
    }
};