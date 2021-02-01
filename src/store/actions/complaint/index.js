import { Routes } from "../../../config";
import environment from "../../../environment";
import { RestClientService } from "../../../service/RestClientService";
import { getUserDetail } from "../../../util";
import { setUserComplaints, setUserSelectedComplaint } from "../user";

export const GET_ALL_COMPLAINTS = "GET_ALL_COMPLAINTS";

export const SET_INIT_COMPLAINTS = "SET_INIT_COMPLAINTS";
export const SET_INPROGRESS_COMPLAINTS = "SET_INPROGRESS_COMPLAINTS";
export const SET_COMPLETED_COMPLAINTS = "SET_COMPLETED_COMPLAINTS";

export const CREATE_COMPLAINT = "CREATE_COMPLAINT";
export const UPDATE_COMPLAINT = "UPDATE_COMPLAINT";
export const SELECTED_COMPLAINT = "SELECTED_COMPLAINT";

export const setSelectedComplaint = (payload) => ({type: SELECTED_COMPLAINT, payload});

export const setInitComplaints = (payload) => ({
  type: SET_INIT_COMPLAINTS,
  payload,
});
export const setInProgressComplaints = (payload) => ({
  type: SET_INPROGRESS_COMPLAINTS,
  payload,
});
export const setCompletedComplaints = (payload) => ({
  type: SET_COMPLETED_COMPLAINTS,
  payload,
});

export const findComplaintById = (value, history) => async (dispatch) => {
  try {
  const complaint = await RestClientService.get(`${environment.complaint}/${value}`);
  dispatch(setUserSelectedComplaint(complaint));
  history.push(Routes.viewIncident);
} catch (error) {
  console.log(error.data);
}
}

export const createComplaint = ({ payload, history }) => {
  return async (dispatch) => {
    try {
      const complaint = await RestClientService.post(
        environment.complaint,
        payload
      );
      console.log(complaint);
      history.push(Routes.landing);
      dispatch(getUserComplaints());
    } catch (error) {
      console.log(error.data);
    }
  };
};

export const updateComplaint = ({ payload, history }) => {
  return async (dispatch) => {
    try {
      const complaint = await RestClientService.put(
        `${environment.complaint}/${payload._id}`,
        payload
      );
      console.log(complaint);
      history.push(Routes.manage);
      dispatch(getAllComplaints());
    } catch (error) {
      console.log(error.data);
    }
  };
};

export const assignToMe = (payload) => {
  return async (dispatch) => {
    const user = getUserDetail();
    try {
      const complaint = await RestClientService.put(
        environment.assignComplaint.replace(":id", payload._id),
        { assignedTo: user.id, status: 1 }
      );
      console.log(complaint);
      dispatch(getAllComplaints());
    } catch (error) {
      console.log(error.data);
    }
  };
};

export const getAllComplaints = () => {
  return async (dispatch) => {
    try {
      const complaints = await RestClientService.get(environment.complaint);
      dispatch(setInitComplaints(complaints.filter((cmp) => cmp.status == 0)));
      dispatch(
        setInProgressComplaints(complaints.filter((cmp) => cmp.status == 1))
      );
      dispatch(
        setCompletedComplaints(complaints.filter((cmp) => cmp.status == 2))
      );
    } catch (error) {}
  };
};

export const getUserComplaints = () => {
  return async (dispatch) => {
    try {
      const complaints = await RestClientService.get(environment.userComplaint);
      dispatch(setUserComplaints(complaints));
    } catch (error) {}
  };
};
