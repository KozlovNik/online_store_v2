import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export type AppThunk<A extends Action, ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  A
>;
