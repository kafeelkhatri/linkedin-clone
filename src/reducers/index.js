import { combineReducers } from "redux";

import userReducer from "./userReducer";
import articleReducer from "./articleReducer";

console.log(articleReducer);

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
});

export default rootReducer;
