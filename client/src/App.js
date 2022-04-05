import React from 'react';
import './styles/reset.css';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// app components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseDetail />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
