import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {deletePostThunk, getPostsThunk} from '../../redux/actions/post'
import AddPost from './AddPost';
import EditPost from './EditPost';


function MyNoteList() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const posts = useSelector((state) => state.posts);
  const myPosts = posts.filter(post => post.author_id === user.id);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  function handleDelete(id) { 
    dispatch(deletePostThunk(id));
  }

  return (
    <div>
      <AddPost />
      <div className='all-post-list'>
      {myPosts.length !== 0 ? 
      myPosts.map((el) => (
          <div className="card" style={{ width: '340px' }}>
           <div className="card-body">
            <h5 className="card-title">{el.title}</h5>
            <img src={el.pic_url} className="card-img-top" alt="..." style={{ width: '300px' }} />
            <p className="card-text">{el.body}</p>
            <p className="card-date">last changes: {el.updatedAt}</p>
          </div>
          <div className="post-menu">
          <button
            className="post-button delete"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(el.id);
            }}
          >
            &#10008;
          </button>
            <EditPost id={el.id}/>
        </div>
          </div> 
      )
      )    
      : <p>No notes yet</p>
      }
      </div>
    </div> )}

export default MyNoteList
