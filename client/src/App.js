import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Registration from './components/Registration/Registration';
import {Routes, Route} from 'react-router-dom';
import NoteList from './components/NoteList/NoteList';
import AuthRoute from './components/Auth/AuthRoute';
import MyNoteList from './components/NoteList/MyNoteList';

function App() {
  return (
    <div className="App">
      <AuthRoute>
      <Navbar />
      <Routes>
        <Route path='/' element={<NoteList />} />  
        <Route path='/mynotes' element={<MyNoteList />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
      </AuthRoute>
    </div>
  );
}

export default App;
