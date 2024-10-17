import React, {useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast"
import { ClanChat, CreatePost, Home, Profile, ViewClan, ViewPost } from './pages'
import {  IfExists, JoinClan, Login, Navbar, Private, Register } from './components'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from './Redux/user/userSlice'

const App = () => {
  const { currentUser } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const fetchPosts = async()=>{
    try {
      const res = await fetch('/api/post/getposts')
      const data = await res.json();

      if(data.success === false && currentUser!=null) {
          dispatch(logoutSuccess())
          toast.error("sesson expired,login again");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  return (
    <div>
      <Toaster />
      <Navbar />
      <div className='p-9'></div>
      <Routes>
        <Route path='/' element={currentUser ? <IfExists currentUser={currentUser} /> : <Home />} />
        <Route path='/register' element={currentUser ? <Profile /> : <Register />} />
        <Route path='/login' element={currentUser ? <Profile /> : <Login />} />
        <Route element={<Private />} >
          <Route path='/devhome' element={<IfExists currentUser={currentUser} />} />
          <Route path='/devhome/clan/:id' element={<ClanChat />} />
          <Route path='/join-clan' element={<JoinClan />} />
          <Route path='/clienthome' element={<IfExists currentUser={currentUser} />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/create-post/:id' element={currentUser && currentUser.client && <CreatePost />} />
          <Route path='/view-post/:id' element={<ViewPost />} />
          <Route path='/view-clan/:id' element={<ViewClan />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App