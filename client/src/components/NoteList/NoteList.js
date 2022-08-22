import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getPostsThunk} from '../../redux/actions/post'
import AddPost from './AddPost';


function NoteList() {

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <div>
      <AddPost />
      <div className='all-post-list'>
      {posts.length !== 0 ? 
      posts.map((el) => (
          <div className="card" style={{ width: '340px' }}>
           <div className="card-body">
            <h5 className="card-title">{el.title}</h5>
            <p className="card-date">author: {el.User?.name}</p>
            <img src={el.pic_url} className="card-img-top" alt="..." style={{ width: '300px' }} />
            <p className="card-text">{el.body}</p>
            <p className="card-date">last changes: {el.updatedAt}</p>
          </div>
          </div> 
      )
      )    
      : <p>No notes yet</p>
      }
      </div>
    </div> )}

export default NoteList
