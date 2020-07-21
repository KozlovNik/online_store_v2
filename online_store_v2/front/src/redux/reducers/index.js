import { combineReducers } from "redux";
import modals from "./modals";
import auth from "./auth";

export default combineReducers({ modals, auth });