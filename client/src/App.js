import React from 'react';
import './styles/reset.css';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// app components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';
import Error from './components/UnhandledError';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseDetail />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signout" element={<UserSignOut />} />
            <Route path="/courses/create" element={<PrivateRoute Component={CreateCourse} />} />
            <Route path="/courses/:id/update" element={<PrivateRoute Component={UpdateCourse} />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;
