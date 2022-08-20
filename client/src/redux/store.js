import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reduces/root';
import { getInitState } from './reduces/user';

const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk)));

export default store;
