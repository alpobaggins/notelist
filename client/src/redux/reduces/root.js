import { combineReducers } from 'redux';
import postReducer from './post';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export default rootReducer;
