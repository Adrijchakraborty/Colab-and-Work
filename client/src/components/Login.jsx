import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { loginStart, loginSuccess, loginFailure } from '../Redux/user/userSlice.js';

const Login = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch('api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (userData.success === false) {
        dispatch(loginFailure());
        toast.error('Invalid credentials');
        return;
      }
      dispatch(loginSuccess(userData));
      toast.success('Login successful');
      userData.client ? navigate('/clienthome') : navigate('/devhome');
    } catch (error) {
      toast.error('Something went wrong');
      dispatch(loginFailure());
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='relative w-96 bg-white border border-gray-300 rounded-xl shadow-xl p-10'>
        <h2 className='text-2xl font-bold text-center mb-8'>Welcome Back</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='relative mb-2'>
            <label htmlFor='email' className='block text-lg font-semibold mb-2'>
              Email
            </label>
            <span className='absolute right-3 top-12 text-xl text-gray-600'>
              <CiMail />
            </span>
            <input
              id='email'
              onChange={handleChange}
              type='email'
              required
              placeholder='Enter your email'
              className='input input-bordered w-full pr-10 pl-4'
            />
          </div>

          <div className='relative mb-2'>
            <label htmlFor='password' className='block text-lg font-semibold mb-2'>
              Password
            </label>
            <span className='absolute right-3 top-12 text-xl text-gray-600'>
              <CiLock/>
            </span>
            <input
              id='password'
              onChange={handleChange}
              type='password'
              required
              placeholder='Enter password'
              className='input input-bordered w-full pr-10 pl-4'
            />
          </div>

          <button
            disabled={loading }
            className='btn btn-primary w-full mt-6'
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Don't have an account?
            <Link to={'/register'} className="text-blue-600 ml-1 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
