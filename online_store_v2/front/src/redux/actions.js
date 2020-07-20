import {
    SET_LOGIN_MODAL_WINDOW
} from '../redux/action-types';


export const setLoginModalWindow = data => {
    return { type: SET_LOGIN_MODAL_WINDOW, payload: data }
}