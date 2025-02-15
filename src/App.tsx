// import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Signin from './routes/Signin';
import PasswordReset from './routes/PasswordReset';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/password-reset' element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
