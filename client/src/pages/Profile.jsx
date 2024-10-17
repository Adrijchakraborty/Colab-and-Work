import React from 'react'
import { useSelector } from "react-redux"

const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  
  return (
    <div>
      <div>
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile picture" className='w-24 rounded-full' />
        <p>Name : {currentUser.name}</p>
        <p>Email : {currentUser.email}</p>
      </div>
    </div>
  )
}

export default Profile