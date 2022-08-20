import { CREATE_POST, DELETE_POST, GET_POSTS, EDIT_POST } from '../constants/constants';

export const getPosts = (data) => ({ type: GET_POSTS, payload: data });
export const deletePost = (id) => ({ type: DELETE_POST, payload: id });
export const createPost = (data) => ({ type: CREATE_POST, payload: data });
export const editPost = (data) => ({ type: EDIT_POST, payload: data });

export const getPostsThunk = () => async (dispatch) => {
  const response = await fetch('/post');
  const result = await response.json();
  dispatch(getPosts(result));
};

export const deletePostThunk = (id) => async (dispatch) => {
  const response = await fetch(`/post/${id}`, { method: 'delete' });
  if (response.status === 200) {
    dispatch(deletePost(id));
  }
};

export const createPostThunk = (body) => async (dispatch) => {
  const response = await fetch(
    '/post',
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();
  dispatch(createPost(result));
};

export const editPostThunk = (body) => async (dispatch) => {
  const response = await fetch(
    `/post`,
    {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();
  dispatch(editPost(result));
};
