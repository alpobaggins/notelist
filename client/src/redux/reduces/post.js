import { CREATE_POST, DELETE_POST, EDIT_POST, GET_POSTS } from '../constants/constants';

const initialState = [];

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return payload;
    case DELETE_POST:
      return state.filter((post) => post.id !== payload);
    case CREATE_POST:
      return [...state, payload];
    case EDIT_POST:
      return payload;
    default:
      return state;
  }
};

export default postReducer;
