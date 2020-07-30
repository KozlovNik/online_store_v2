import {

} from "../action-types";

const initialState = {
    isLoading: false,
    errors: [],
    products: null
}

export default function products(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
};