import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Create from './Pages/Create';
import Home from './Pages/Home';
function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/create" element={<Create/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
