import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  signInStart,signInSuccess,signInfailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData,setFormData]=useState({})
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!formData.email || !formData.password){
        return dispatch(signInfailure('Please fill all fields'))
    }

    try{
       dispatch(signInStart());
       const baseURL = "http://localhost:3147";
        const res = await fetch(`${baseURL}/api/auth/signin`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData),// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const data = await res.json();
     
      if(data.success===false){
        dispatch(signInfailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/")
      }

    }catch(error){
      dispatch(signInfailure(error.message))
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <button
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        {errorMessage && (
          <div className="mt-6 text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
