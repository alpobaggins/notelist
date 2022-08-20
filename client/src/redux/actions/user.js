import { CREATE_USER, GET_USER, LOGOUT_USER } from '../constants/constants';

export const getUser = (data) => ({ type: GET_USER, payload: data });
export const createUser = (data) => ({ type: CREATE_USER, payload: data });
export const logoutUser = (data) => ({ type: LOGOUT_USER, payload: data });

export const checkAuthThunk = () => async (dispatch) => {
  const response = await fetch('/checkauth');
  const result = await response.json();
  dispatch(getUser(result));
};

export const getUserThunk = (body) => async (dispatch) => {
  const response = await fetch(
    '/login',
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();
  dispatch(getUser(result));
};

export const createUserThunk = (body) => async (dispatch) => {
  const response = await fetch(
    '/registration',
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();
  dispatch(createUser(result));
};

export const logoutUserThunk = (body) => async (dispatch) => {
  const response = await fetch('/logout');
  if(response.ok) {
    dispatch(logoutUser());
  }
};
