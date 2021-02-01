import { message } from "antd";
import { Routes, SESSION_TOKEN } from "../../../config";
import environment from "../../../environment";
import { RestClientService } from "../../../service/RestClientService";
import { getUserDetail } from "../../../util";

export const GET_ALL_COMPLAINTS = "GET_ALL_COMPLAINTS";

export const SET_INIT_COMPLAINTS = "SET_INIT_COMPLAINTS";
export const SET_INPROGRESS_COMPLAINTS = "SET_INPROGRESS_COMPLAINTS";
export const SET_COMPLETED_COMPLAINTS = "SET_COMPLETED_COMPLAINTS";

export const CREATE_COMPLAINT = "CREATE_COMPLAINT";
export const UPDATE_COMPLAINT = "UPDATE_COMPLAINT";
export const SELECTED_COMPLAINT = "SELECTED_COMPLAINT";

//USERS ACTIONS
export const LOGIN_USER = "LOGIN_USER";
export const SET_USER_DTL = "SET_USER_DTL";
export const SET_USER_COMPLAINTS = "SET_USER_COMPLAINTS";
export const USER_SELECTED_COMPLAINT = "USER_SELECTED_COMPLAINT";

export const setUser = (payload) => ({ type: SET_USER_DTL, payload });
export const setUserSelectedComplaint = (payload) => ({ type: USER_SELECTED_COMPLAINT, payload });
export const setUserComplaints = (payload) => ({
  type: SET_USER_COMPLAINTS,
  payload,
});

export const createUser = ({ payload, history }) => {
  return async (dispatch) => {
    try {
      const userToken = await RestClientService.post(
        environment.register,
        payload
      );
      sessionStorage.setItem(SESSION_TOKEN, userToken.token);
      if (userToken.token) {
        history.push(Routes.landing);
        dispatch(setUser(getUserDetail(userToken.token)));
      } else {
        message.warn("Invalid Credentials");
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const loginUser = ({ payload, history }) => {
  return async (dispatch) => {
    try {
      const userToken = await RestClientService.post(
        environment.login,
        payload
      );
      sessionStorage.setItem(SESSION_TOKEN, userToken.token);
      if (userToken.token) {
        history.push(Routes.landing);
        dispatch(setUser(getUserDetail(userToken.token)));
      } else {
        message.warn("Invalid Credentials");
      }
    } catch (error) {
      alert(error);
    }
  };
};
