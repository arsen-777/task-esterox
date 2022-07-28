import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AdminPlays from './pages/AdminPlays/AdminPlays';
import PlayForm from './components/PlayForm/PlayForm';
import { useSelector } from 'react-redux';
function App() {
  const { isOpen } = useSelector((state) => state.plays);
  return (
    <div className='relative'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminplays" element={<AdminPlays />} />
        </Routes>
      </BrowserRouter>
      {isOpen && <PlayForm />}
      <AdminPlays />
    </div>
  );
}

export default App;
