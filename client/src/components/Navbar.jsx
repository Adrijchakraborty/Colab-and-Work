import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
import UserProfile from './UserProfile'
import LoginSetup from './LoginSetup'
import Logo from "../assets/nav-logo-removebg.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {currentUser} = useSelector(state=>state.user)

    return (
        <div className='fixed w-full z-50'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to={'/'}><img src={Logo} alt="" className='w-24'/></Link>
                </div>
                {currentUser ? <UserProfile/> : <LoginSetup/>}
            </div>
        </div>
    )
}

export default Navbar