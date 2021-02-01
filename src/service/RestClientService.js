import axios from "axios";
import { SESSION_TOKEN } from "../config";
import { message } from 'antd'

axios.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${sessionStorage.getItem(SESSION_TOKEN)}`;
  return req;
});

const makeDeleteCall = async (url, _options) => {
  // console.log("GET request : "+ JSON.stringify(url));

  let options = _options
    ? _options
    : {
        headers: {
          "Content-Type": "application/json",
        },
      };

  try {
    const response = await axios.delete(url, options);
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleError(error);
    if (error.response) {
      return error.response;
    }
    return error;
  }
};

const makeGetCall = async (url, _options) => {
  try {
    const response = await axios.get(url);
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleError(error);
    if (error.response) {
      return error.response;
    }
    return error;
  }
};

const makePostCall = async (url, body, _options) => {
  try {
    const response = await axios.post(url, body, _options);
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleError(error);
    if (error.response) {
      return error.response;
    }
    return error;
  }
};

const makePutCall = async (url, body, _options) => {
  console.log("PUT request : " + JSON.stringify(body));

  try {
    const response = await axios.put(url, body, _options);
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleError(error);
    if (error.response) {
      return error.response;
    }
    return error;
  }
};

function handleError(error) {
  if(error.response.data?.errors)
    message.error(JSON.stringify(error.response.data?.errors))
  throw error;
}

export const RestClientService = {
  post: makePostCall,
  get: makeGetCall,
  put: makePutCall,
  delete: makeDeleteCall,
};
