import './App.css';
import Home from './pages/Home';
import Desciption from './pages/Description';
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        
          <Route path="/home/:id" element={<Desciption />} />

      </Routes>
    </div>
  );
}

export default App;
