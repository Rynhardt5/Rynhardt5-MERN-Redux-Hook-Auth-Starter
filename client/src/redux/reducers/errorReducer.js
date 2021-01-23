import { SET_ERROR, CLEAR_ERROR } from "../actionTypes";

const initialState = null;

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { message: action.payload.error.message };
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};

export default errorReducer;
