import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

type HomeProps = {
  userId: string;
};

function Home({ userId }: HomeProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Is it better to handle the redirect here? Or to do it in App.tsx
    if (!userId) {
      navigate('/signin');
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        // ...
        // console.log('user is logged out');
        navigate('/signin');
      }
    });
  }, []);

  return (
    <main className='Home'>
      <h1 className='text-3xl font-bold underline'>This is the Home screen</h1>
      {userId ? <p>Signed in as ID {userId}</p> : ''}
    </main>
  );
}

export default Home;
