import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FurnitureList from "./components/FurnitureList";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import CreateFurnitureForm from "./components/CreateFurnitureForm";
import FurnitureDetail from "./components/FurnitureDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/" element={<FurnitureList />} />
          <Route path="/uploadform" element={<UploadForm />} />
          <Route
            path="/createfurnitureform"
            element={<CreateFurnitureForm />}
          />
          <Route path="/furniture/:id" element={<FurnitureDetail />} />
        </Route>

        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
