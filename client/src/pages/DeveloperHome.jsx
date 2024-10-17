import React from 'react'
import { ClanChat, ClanJoin } from '../components'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const DevloperHome = () => {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <div>
      {currentUser.clan ? <Navigate to={`/devhome/clan/${currentUser.clan}`}/> : <ClanJoin/>}
    </div>
  )
}

export default DevloperHome