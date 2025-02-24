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
      <main className=''>
        <p>
          Check your email for a password reset link, and then{' '}
          <NavLink to='/signin'>sign in</NavLink> with your new password.
        </p>
        <p>
          Didn't receive an email?{' '}
          <span onClick={handleResetEmail}>Send it again.</span>
        </p>
      </main>
    );
  }

  if (!emailSent) {
    return (
      <main className='PasswordReset'>
        <h1>Password Reset</h1>
        <p>
          Enter the email associated with your account and click the button
          below
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetEmail();
          }}
        >
          <input
            type='email'
            id='email-address'
            name='email'
            required
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Send Password Reset Email</button>
        </form>
      </main>
    );
  }
}

export default PasswordReset;
