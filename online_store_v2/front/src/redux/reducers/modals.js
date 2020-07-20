import { SET_LOGIN_MODAL_WINDOW } from "../action-types";

const initialState = {
    loginPopup: false
}

const modals = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_MODAL_WINDOW: {
            return {
                ...state,
                loginPopup: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default modals;
