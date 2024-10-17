import React from 'react'
import { ClientChat, ClientPosts, ClientSidebar } from '../components'
import { useSelector } from 'react-redux'

const ClientHome = () => {
  const {page} = useSelector(state=>state.user)
  return (
    <div className='flex'>
      <div><ClientSidebar/></div>
      <div>
        {page == 1 && <ClientChat/>}
        {page == 2 && <ClientPosts/>}
      </div>
    </div>
  )
}

export default ClientHome