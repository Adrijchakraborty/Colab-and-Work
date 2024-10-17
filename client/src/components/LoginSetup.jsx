import React from 'react'
import { Link } from 'react-router-dom'

const LoginSetup = () => {
    return (
        <div className='flex gap-3'>
            <Link to={'/login'} className='link link-primary'>Login</Link>
            <Link to={'/register'} className='link link-primary'>Register</Link>
        </div>
    )
}

export default LoginSetup