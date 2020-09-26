import { combineReducers } from "redux";
import modals from "./modals";
import auth from "./auth";
import products from './products'

export default combineReducers({ modals, auth, products });