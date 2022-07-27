import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AdminPlays from './pages/AdminPlays/AdminPlays';
import PlayForm from './components/PlayForm/PlayForm';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminplays" element={<AdminPlays />} />
        </Routes>
      </BrowserRouter>
      <PlayForm />
    </div>
  );
}

export default App;
