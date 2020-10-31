import { combineReducers } from "redux";
import auth from "./auth/auth";
import products from "./products/products";

const rootReducer = combineReducers({ auth, products });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;


