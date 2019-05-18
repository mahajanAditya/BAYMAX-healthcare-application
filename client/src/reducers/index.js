import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
console.log("in reducers/index.js")

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});