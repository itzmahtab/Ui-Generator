import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import "./App.css"
const App = () => {
  return (

    <>
      <BrowserRouter>
    

      {/* Routes */}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/" element={<NoPage />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
