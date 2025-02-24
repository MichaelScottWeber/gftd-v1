import * as React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

// type SigninProps = {
//   userId: string;
// };

// function Signin({ userId }: SigninProps) {
function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <main className='bg-gray-50 h-screen flex flex-col items-center p-8'>
      <h1 className='text-gray-900 text-3xl pb-8'>Signin</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white container max-w-screen-sm p-8 border border-gray-200 rounded-xl shadow-md'
      >
        <div className='flex flex-col mb-5'>
          <label htmlFor='email-address'>Email address</label>
          <input
            id='email-address'
            name='email'
            type='email'
            required
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col mb-5'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            required
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        <button
          className='px-6 py-2 bg-green-700 rounded-md text-white mb-5 cursor-pointer'
          type='submit'
        >
          Sign In
        </button>
        <p>
          <NavLink className='text-blue-500' to='/password-reset'>
            Forgot Password?
          </NavLink>
        </p>
        <p>
          No account yet?{' '}
          <NavLink className='text-blue-500' to='/signup'>
            Sign up
          </NavLink>
        </p>
      </form>
    </main>
  );
}

export default Signin;
