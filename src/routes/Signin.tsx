import * as React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

type SigninProps = {
  userId: string;
};

function Signin({ userId }: SigninProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        // handle error better here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <main className='Signin'>
      <h1>Signin</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email-address'>Email address</label>
          <input
            id='email-address'
            name='email'
            type='email'
            required
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            required
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Sign In</button>
      </form>
      <p>
        No account yet? <NavLink to='/signup'>Sign up</NavLink>
      </p>
    </main>
  );
}

export default Signin;
