import { combineReducers } from "redux";
import auth from "./auth/auth";
import products from "./products/products";
import recentlyViewed from "./recently-viewed/recently-viewed";

const rootReducer = combineReducers({ auth, products, recentlyViewed });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
