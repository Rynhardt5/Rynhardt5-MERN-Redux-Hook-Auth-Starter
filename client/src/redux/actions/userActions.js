import setAuthToken from "../../utils/setAuthToken";
import { setError } from "../actions/errorActions";

import {
  USER_LOGGED_IN,
  USER_REGISTERED,
  LOAD_USER,
  LOG_USER_OUT,
  SET_LOADING_TO_FALSE,
} from "../actionTypes";

import axios from "axios";

export const logUserOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOG_USER_OUT,
  });
};

export const setLoadingToFalse = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_TO_FALSE,
  });
};

export const loadUser = (token) => async (dispatch) => {
  try {
    if (token) {
      setAuthToken(token);
    }

    const response = await axios.get("http://localhost:5000/users/current");

    if (response) {
      localStorage.setItem("token", JSON.stringify(token));
      dispatch({
        type: LOAD_USER,
        payload: {
          isAuth: true,
          id: response.data.user.id,
          token,
        },
      });
    } else {
      localStorage.removeItem("token");
    }
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export const logUserIn = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      data
    );

    if (response) {
      dispatch({
        type: USER_LOGGED_IN,
        payload: {
          token: response.data.token,
        },
      });

      dispatch(loadUser(response.data.token));
    }
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      data
    );

    if (response) {
      dispatch({
        type: USER_REGISTERED,
        payload: {
          token: response.data.token,
        },
      });

      dispatch(loadUser(response.data.token));
    }
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};
