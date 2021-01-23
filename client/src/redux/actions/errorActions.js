import { SET_ERROR, CLEAR_ERROR } from "../actionTypes";

export const setError = (error) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: { error },
  });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
