import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const Register = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target;
        setData({
            ...data,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const userData = await res.json();

            if (userData.success === false) {
                toast.error('Wrong registration');
                setLoading(false);
                return;
            }
            toast.success('Successfully registered');
            setLoading(false);
            navigate('/login');
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='relative w-96 bg-white border border-gray-300 rounded-xl shadow-xl p-10'>
                <h2 className='text-2xl font-bold text-center mb-8'>Welcome</h2>

                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className='relative'>
                        <label htmlFor='name' className='block text-lg font-semibold mb-2'>
                            Name
                        </label>
                        <span className='absolute right-3 top-12 text-xl text-gray-600'>
                            <CiUser />
                        </span>
                        <input
                            id='name'
                            onChange={handleChange}
                            type='text'
                            required
                            placeholder='Enter your name'
                            className='input input-bordered w-full pr-10 pl-4'
                        />
                    </div>

                    <div className='relative'>
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

                    <div className='relative'>
                        <label htmlFor='password' className='block text-lg font-semibold mb-2'>
                            Password
                        </label>
                        <span className='absolute right-3 top-12 text-xl text-gray-600'>
                            <CiLock />
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

                    <div className='relative'>
                        <span className='flex items-center gap-2'>
                            <input
                                id="client"
                                type="checkbox"
                                name="client"
                                onChange={handleChange}
                                className='mt-1'
                            />
                            <label htmlFor="client">Register as a client</label>
                        </span>
                    </div>

                    <button
                        disabled={loading}
                        className='btn btn-primary w-full mt-3'
                        type='submit'
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p>Already have an account?
                        <Link to={'/login'} className="text-blue-600 ml-1 hover:underline">Login</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Register;
