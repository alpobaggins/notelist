import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createUserThunk} from '../../redux/actions/user'

function Registration() {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (form.name && form.email && form.password) {
        dispatch(createUserThunk(form));
        setForm({});
        e.target.reset();
    }
    navigate('/');
  }

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="form-label">Your name</p>
          <input type="text" value={form.name || ''} name="name" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <p className="form-label">Email address</p>
          <input type="email" value={form.email || ''} name="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <p className="form-label">Password</p>
          <input type="password" value={form.password || ''} name="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-outline-danger">Submit</button>
      </form>
    </div>
  );
}

export default Registration;
