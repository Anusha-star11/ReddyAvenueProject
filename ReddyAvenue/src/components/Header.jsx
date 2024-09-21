import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import baseURL from '../url';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [showMessage, setShowMessage] = useState(false);

  const handleSignout = async () => {
    try {
      // const baseURL = 'http://localhost:3147';
      const res = await fetch(`${baseURL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignin = () => {
    navigate("/sign-in");
  };

  const handleRaiseAComplaintButton = () => {
    if (currentUser) {
      navigate("/complaint/new");
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 10000);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <a href="/home" className="hover:text-blue-700">Reddy Avenue</a>
          </div>
          <nav className="space-x-4 flex items-center">
            <a href="/home" className="hover:text-blue-700">Home</a>
            <a href="/about" className="hover:text-blue-700">About</a>
            <a href="/contact" className="hover:text-blue-700">Contact</a>
          </nav>
          <div className="relative flex items-center">
            <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleRaiseAComplaintButton}>
              Raise a complaint
            </button>
          </div>
          {currentUser ? (
            <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSignout}>
              Logout
            </button>
          ) : (
            <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSignin}>
              Sign In
            </button>
          )}
        </div>
      </header>
      {showMessage && (
        <div style={messageStyle}>
          Sign in to raise a complaint
        </div>
      )}
    </>
  );
}

const messageStyle = {
  position: 'absolute',
  top: '5rem', // Adjust this value to set the distance from the top
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '15px',
  borderRadius: '5px',
  zIndex: '1000',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};
