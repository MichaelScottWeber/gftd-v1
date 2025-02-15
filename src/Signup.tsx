import * as React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        console.log(user);
        // Navigate to login
      })
      .catch((error) => {
        // Need to handle errors better
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <section className='Signup'>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email-address'>Email Address</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email Address'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </section>
  );
}

export default Signup;
