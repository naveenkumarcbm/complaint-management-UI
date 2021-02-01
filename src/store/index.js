import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import complaintReducer from "./reducer/complaint";
import userReducer from "./reducer/user";

const reducer = combineReducers({
  user: userReducer,
  complaint: complaintReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
