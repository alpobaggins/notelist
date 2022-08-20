import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../redux/actions/post';

function AddPost() {
  const [form, setForm] = useState({});

  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (form.title && form.body) {
        dispatch(createPostThunk(form));
        setForm({});
        e.target.reset();
      setForm('');
      setFlag(!flag);
    }
  }

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  function showForm() {
    setFlag(!flag);
  }

  return (
    <div>
      <button onClick={showForm}>Add note</button>
      {flag && 
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <p className="form-label">Title of note</p>
        <input type="text" value={form.title || ''} name="title" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <p className="form-label">Your text</p>
        <input type="text" value={form.body || ''} name="body" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Write whatever you think</div>
      </div>
      <div className="mb-3">
        <p className="form-label">Add picture</p>
        <input type="text" value={form.pic_url || ''} name="pic_url" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      </div>
      <button type="submit" className="btn btn-outline-danger">Add</button>
    </form>
      }
    </div>
  )
}

export default AddPost
