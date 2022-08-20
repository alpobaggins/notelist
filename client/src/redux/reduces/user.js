import { CREATE_USER, GET_USER, LOGOUT_USER } from '../constants/constants';

const initialState = {};

export const getInitState = () => {
  return initialState;
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return payload;
    case CREATE_USER:
      return payload;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
