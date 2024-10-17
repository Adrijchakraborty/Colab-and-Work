import React from 'react'
import { ClientHome,DeveloperHome } from '../pages'

const IfExists = ({currentUser}) => {
  return (
    <div>{currentUser.client ? <ClientHome/>:<DeveloperHome/>}</div>
  )
}

export default IfExists