import * as React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// type SignupProps = {
//   userId: string;
// };

// function Signup({ userId }: SignupProps) {
function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUserAndAddToFirestore = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        console.log(user);
        // Navigate to signin
        return user.uid;
      })
      .then((userId) => {
        addDoc(collection(db, 'users'), {
          id: userId,
          name: {
            first: firstName,
            last: lastName,
          },
          email: email,
          createdAt: new Date(),
        });
        console.log('User added to Firestore');
        navigate('/');
      })
      .catch((error) => {
        // Need to handle errors better
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className='bg-gray-50 h-screen flex flex-col items-center p-8'>
      <h1 className='text-gray-900 text-3xl pb-8'>Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupUserAndAddToFirestore();
        }}
        className='bg-white container max-w-screen-sm p-8 border border-gray-200 rounded-xl shadow-md'
      >
        {/* First Name */}
        <div className='flex flex-col mb-5'>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        {/* Last Name */}
        <div className='flex flex-col mb-5'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        {/* Email Address */}
        <div className='flex flex-col mb-5'>
          <label htmlFor='email-address'>Email Address</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email Address'
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        {/* Password */}
        <div className='flex flex-col mb-5'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className='border border-gray-400 p-2 rounded-md'
          />
        </div>
        <button
          className='px-6 py-2 bg-green-700 rounded-md text-white mb-5 cursor-pointer'
          type='submit'
        >
          Sign Up
        </button>
        <p>
          Already have an account?{' '}
          <NavLink className='text-blue-500' to='/signin'>
            Sign in
          </NavLink>
        </p>
      </form>
    </main>
  );
}

export default Signup;
