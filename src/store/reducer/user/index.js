import { SET_USER_COMPLAINTS, SET_USER_DTL, USER_SELECTED_COMPLAINT } from "../../actions/user";

export default function userReducer(state = { user: {}, selectedComplaint:{}, complaints:[] }, action) {
  switch (action.type) {
    case SET_USER_DTL:
      return { ...state, ...{ user: action.payload } };
    case USER_SELECTED_COMPLAINT:
      return { ...state, ...{ selectedComplaint : action.payload} }
    case SET_USER_COMPLAINTS:
        return {...state, ...{complaints: action.payload}}
    default:
      return state;
  }
}
