import React from 'react'
import { pageChange } from '../Redux/user/userSlice.js'
import {useDispatch} from "react-redux"

const Sidebar = ({value}) => {
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col'>
      <button onClick={()=>dispatch(pageChange(1))}>Posts</button>
      
      {value && <button onClick={()=>dispatch(pageChange(2))}>Personal Chat</button>}
      <button onClick={()=>dispatch(pageChange(3))}>Clan Chat</button>
    </div>
  )
}

export default Sidebar