import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { editPostThunk } from '../../redux/actions/post';

function EditPost(body) {

  const {id} = body;

  const [form, setForm] = useState({});

  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const newInf = {
      id,
      title: form.title,
      body: form.body,
      pic_url: form.pic_url
    }
    dispatch(editPostThunk(newInf));
    setForm({});
    e.target.reset();
    setForm('');
    setFlag(!flag);
    }

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  function showForm() {
    setFlag(!flag);
  }

  return (
    <div>
      <button onClick={showForm}>&#9998;</button>
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
      <button type="submit" className="btn btn-outline-danger">Change</button>
    </form>
      }
    </div>
  )
}

export default EditPost
