import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { logoutStart,logoutSuccess,logoutFailure } from '../Redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const handleChange = async () => {
        try {
            dispatch(logoutStart());
            const res = await fetch('/api/auth/logout');
            const data = await res.json();
            if (!data.success) {
                toast.error("Failed to log out");
                dispatch(logoutFailure());
            }
            toast.success("Logged out successfully");
            dispatch(logoutSuccess());
            
        } catch (error) {
            toast.error("Failed to log out");
            dispatch(logoutFailure());
        }
    };
    return (
        <div className="flex-none gap-2">
            {currentUser.client && <Link to={`/create-post/${currentUser._id}`} className="inline-block px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0">
            Create a post
</Link>}
            <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <button className="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to={`/profile/${currentUser._id}`}>
                        <button className="justify-between">
                            Profile
                        </button>
                        </Link>
                    </li>
                    <li><button onClick={handleChange}>Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile