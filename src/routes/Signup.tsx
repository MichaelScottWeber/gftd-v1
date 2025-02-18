import * as React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

type SignupProps = {
  userId: string;
};

function Signup({ userId }: SignupProps) {
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
          firstName: firstName,
          lastName: lastName,
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
    <main className='Signup'>
      <h1>Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupUserAndAddToFirestore();
        }}
      >
        {/* First Name */}
        <div>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
          />
        </div>
        {/* Last Name */}
        <div>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
          />
        </div>
        {/* Email Address */}
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
        {/* Password */}
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
      <p>
        Already have an account? <NavLink to='/signin'>Sign in</NavLink>
      </p>
    </main>
  );
}

export default Signup;
