// import { useDispatch, useSelector } from 'react-redux';
// import { signoutSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import baseURL from '../url';

// export default function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector(state => state.user);
//   const [showMessage, setShowMessage] = useState(false);

//   const handleSignout = async () => {
//     try {
//       // const baseURL = 'http://localhost:3147';
//       const res = await fetch(`${baseURL}/api/user/signout`, {
//         method: "POST",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleSignin = () => {
//     navigate("/sign-in");
//   };

//   const handleRaiseAComplaintButton = () => {
//     if (currentUser) {
//       navigate("/complaint/new");
//     } else {
//       setShowMessage(true);
//       setTimeout(() => {
//         setShowMessage(false);
//       }, 10000);
//     }
//   };

//   return (
//     <>
//       <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="text-xl font-bold">
//             <a href="/home" className="hover:text-blue-700">Reddy Avenue</a>
//           </div>
//           <nav className="space-x-4 flex items-center">
//             <a href="/home" className="hover:text-blue-700">Home</a>
//             <a href="/about" className="hover:text-blue-700">About</a>
//             <a href="/contact" className="hover:text-blue-700">Contact</a>
//           </nav>
//           <div className="relative flex items-center">
//             <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleRaiseAComplaintButton}>
//               Raise a complaint
//             </button>
//           </div>
//           {currentUser ? (
//             <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSignout}>
//               Logout
//             </button>
//           ) : (
//             <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSignin}>
//               Sign In
//             </button>
//           )}
//         </div>
//       </header>
//       {showMessage && (
//         <div style={messageStyle}>
//           Sign in to raise a complaint
//         </div>
//       )}
//     </>
//   );
// }

// const messageStyle = {
//   position: 'absolute',
//   top: '5rem', // Adjust this value to set the distance from the top
//   left: '50%',
//   transform: 'translateX(-50%)',
//   backgroundColor: '#f8d7da',
//   color: '#721c24',
//   padding: '15px',
//   borderRadius: '5px',
//   zIndex: '1000',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
// };


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import baseURL from '../url';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignout = async () => {
    try {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">
              <a href="/home" className="hover:text-blue-700">Reddy Avenue</a>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <nav className="hidden md:flex space-x-4 items-center">
              <a href="/home" className="hover:text-blue-700">Home</a>
              <a href="/about" className="hover:text-blue-700">About</a>
              <a href="/contact" className="hover:text-blue-700">Contact</a>
              <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleRaiseAComplaintButton}>
                Raise a complaint
              </button>
              {currentUser ? (
                <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSignout}>
                  Logout
                </button>
              ) : (
                <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSignin}>
                  Sign In
                </button>
              )}
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="mt-4 md:hidden">
              <a href="/home" className="block py-2 hover:text-blue-700">Home</a>
              <a href="/about" className="block py-2 hover:text-blue-700">About</a>
              <a href="/contact" className="block py-2 hover:text-blue-700">Contact</a>
              <button className="w-full bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2" onClick={handleRaiseAComplaintButton}>
                Raise a complaint
              </button>
              {currentUser ? (
                <button className="w-full bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2" onClick={handleSignout}>
                  Logout
                </button>
              ) : (
                <button className="w-full bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2" onClick={handleSignin}>
                  Sign In
                </button>
              )}
            </nav>
          )}
        </div>
      </header>
      {showMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          Sign in to raise a complaint
        </div>
      )}
    </>
  );
}