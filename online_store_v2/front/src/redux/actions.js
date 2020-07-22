import {
    SET_LOGIN_MODAL_WINDOW,
    GET_USER_LOADING,
    GET_USER_LOADED,
    GET_USER_FAILURE,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST
} from '../redux/action-types';
import axios from 'axios';

const link = 'http://127.0.0.1:8000/api/';

export const setLoginModalWindow = data => ({
    type: SET_LOGIN_MODAL_WINDOW, payload: data
})

export const getUser = () => (dispatch, getState) => {

    dispatch({ type: GET_USER_LOADING })

    const token = getState().auth.token;

    if (!token) {
        return dispatch({ type: GET_USER_FAILURE })
    }

    axios.post(`${link}accounts/user/`, null, {
        headers: {
            'Authorization': `token ${token}`,
        }
    })
        .then(res => dispatch({ type: GET_USER_LOADED, payload: res.data }))
        .catch(() => dispatch({ type: GET_USER_FAILURE }))
}

export const login = data => dispatch => {

    dispatch({ type: LOGIN_LOADING })

    axios.post(`${link}accounts/login/`, data)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            dispatch(setLoginModalWindow(false))
        })
        .catch(err => {
            try {
                const errors = err.response.data;
                const errorsObj = Object.values(errors);
                dispatch({
                    type: LOGIN_FAILURE, payload: errorsObj
                })
            } catch (e) { }
        })
}

export const logout = () => dispatch => {

    const token = localStorage.getItem('token')

    axios.post(`${link}accounts/logout/`, null, {
        headers: {
            'Authorization': `token ${token}`,
        }
    })
        .then(() => {
            dispatch({ type: LOGOUT_SUCCESS })
        })
        .catch(err => {
            const errors = err.response.data;
            const errorsObj = Object.values(errors);
            dispatch({
                type: LOGOUT_FAILURE, payload: errorsObj
            })
        })
}

export const register = (data, cb) => dispatch => {
    dispatch({ type: REGISTER_REQUEST })

    axios.post(`${link}accounts/register/`, data)
        .then(res => {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
            cb();

        })
        .catch(err => {
            try {
                const errors = err.response.data;
                const errorsObj = Object.values(errors);
                dispatch({
                    type: REGISTER_FAILURE, payload: errorsObj
                })
            } catch (e) { }
        })
}