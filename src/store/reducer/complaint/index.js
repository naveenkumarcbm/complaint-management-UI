import {
  SELECTED_COMPLAINT,
  SET_COMPLETED_COMPLAINTS,
  SET_INIT_COMPLAINTS,
  SET_INPROGRESS_COMPLAINTS,
} from "../../actions/complaint";

const compInit = {
  selectedComplaint: {},
  initList: [],
  inProgressList: [],
  completedList: [],
};
export default function complaintReducer(state = compInit, action) {
  switch (action.type) {
    case SET_INIT_COMPLAINTS:
      return { ...state, ...{ initList: action.payload } };
    case SET_INPROGRESS_COMPLAINTS:
      return { ...state, ...{ inProgressList: action.payload } };
    case SET_COMPLETED_COMPLAINTS:
      return { ...state, ...{ completedList: action.payload } };
    case SELECTED_COMPLAINT:
      return { ...state, ...{ selectedComplaint: action.payload } };
    default:
      return state;
  }
}
