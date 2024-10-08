import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInfailure } from '../redux/user/userSlice';
import baseURL from '../url';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInfailure('Please fill all fields'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`${baseURL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInfailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/home');
      }
    } catch (error) {
      dispatch(signInfailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-500 text-sm sm:text-base">Please sign in to your account</p>
        </div>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 rounded-md text-sm sm:text-base transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 sm:mt-6 text-red-500 text-xs sm:text-sm text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}