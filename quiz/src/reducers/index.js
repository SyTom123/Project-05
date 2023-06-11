import { combineReducers } from "redux";
import AuthenReducer from "./authenReducer";
const allReducers = combineReducers({
  AuthenReducer,
});
export default allReducers;
