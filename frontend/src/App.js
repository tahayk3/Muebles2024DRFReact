import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FurnitureList from './components/FurnitureList';
import Login from './components/Login';
import UploadForm from './components/UploadForm';
import CreateFurnitureForm from './components/CreateFurnitureForm';
import FurnitureDetail from './components/FurnitureDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/furnitures" element={<FurnitureList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadform" element={<UploadForm />} />
        <Route path="/createfurnitureform" element={<CreateFurnitureForm />} />
        <Route path="/furniture/:id" element={<FurnitureDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;