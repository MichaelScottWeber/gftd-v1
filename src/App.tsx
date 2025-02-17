import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Signin from './routes/Signin';
import PasswordReset from './routes/PasswordReset';

function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserId(user.uid);
        console.log('uid', uid);
      } else {
        // User is signed out
        setUserId('');
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home userId={userId} />} />
        <Route path='/signup' element={<Signup userId={userId} />} />
        <Route path='/signin' element={<Signin userId={userId} />} />
        <Route
          path='/password-reset'
          element={<PasswordReset userId={userId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
