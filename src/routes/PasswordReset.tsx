import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router';

// type PasswordResetProps = {
//   userId: string;
// };

// function PasswordReset({ userId }: PasswordResetProps) {
function PasswordReset() {
  const auth = getAuth();
  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // navigate('/login');
        setEmailSent(true);
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  if (emailSent) {
    return (
      <main className='bg-gray-50 h-screen flex flex-col items-center p-8'>
        <p>
          Check your email for a password reset link, and then{' '}
          <NavLink className='text-blue-500 cursor-pointer' to='/signin'>
            sign in
          </NavLink>{' '}
          with your new password.
        </p>
        <p>
          Didn't receive an email?{' '}
          <span
            className='text-blue-500 cursor-pointer'
            onClick={handleResetEmail}
          >
            Send it again.
          </span>
        </p>
      </main>
    );
  }

  if (!emailSent) {
    return (
      <main className='bg-gray-50 h-screen flex flex-col items-center p-8'>
        <h1 className='text-gray-900 text-3xl pb-8'>Password Reset</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetEmail();
          }}
          className='bg-white container max-w-screen-sm p-8 border border-gray-200 rounded-xl shadow-md'
        >
          <div className='flex flex-col mb-5'>
            <label htmlFor='email-address'>
              Enter the email associated with your account and click the button
              below
            </label>
            <input
              type='email'
              id='email-address'
              name='email'
              required
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-400 p-2 rounded-md'
            />
          </div>
          <button className='px-6 py-2 bg-green-700 rounded-md text-white mb-5 cursor-pointer'>
            Send Password Reset Email
          </button>
        </form>
      </main>
    );
  }
}

export default PasswordReset;
