import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FurnitureList from './components/FurnitureList';
import Login from './components/Login';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/furniture" element={<FurnitureList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadform" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;