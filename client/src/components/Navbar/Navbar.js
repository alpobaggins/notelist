import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import { logoutUserThunk } from '../../redux/actions/user';

function Navbar() {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">posts</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user?.name && (<li className="nav-item">
                <Link to="/registration" className="nav-link">registration</Link>
              </li>)}
              {!user?.name && (<li className="nav-item">
                <Link to="/login" className="nav-link">login</Link>
              </li>)}
              {user?.name && (<li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={() => {dispatch(logoutUserThunk())}}>logout</Link>
              </li>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
