// import { NavLink } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';

type NavbarProps = {
  userId: string;
};

function Navbar({ userId }: NavbarProps) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/Signin');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <nav className='Navbar'>
      <span>gftd</span>
      {userId ? <button onClick={handleSignout}>Sign Out</button> : ''}
    </nav>
  );
}

export default Navbar;
