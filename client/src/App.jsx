import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Home from './components/home/Home';
import Auth from './utils/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route element={<Auth/>}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path='*' element={<h1>404 Page Not Found </h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
