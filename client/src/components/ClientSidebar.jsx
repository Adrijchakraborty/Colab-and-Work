import React from 'react'
import { pageChange } from '../Redux/user/userSlice'
import { useDispatch } from 'react-redux'

const ClientSidebar = () => {
    const dispatch = useDispatch()
  return (
    <div className='bg-green-400 flex flex-col'>
        <button onClick={()=>dispatch(pageChange(1))}>Chats</button>
        <button onClick={()=>dispatch(pageChange(2))}>Posts</button>
    </div>
  )
}

export default ClientSidebar