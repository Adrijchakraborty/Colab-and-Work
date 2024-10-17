import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import toast from "react-hot-toast"
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import MainContent1 from './MainContent1'
import MainContent2 from './MainContent2'
import RequestList from './RequestList'

const ClanChat = () => {
  const [clanData,setClanData] = useState()
  const {currentUser,page} = useSelector(state=>state.user)

  const fetchClan = async () => {
    try {
      const res = await fetch(`/api/clan/getclan/${currentUser.clan}`);      
      const data = await res.json();
      
      if (data.success === false) {
        toast.error("No clan data found");
        return;
      }
      
      setClanData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() =>{
    fetchClan();
  },[])
  return (
    <div className='flex bg-slate-300 min-h-screen'>
      <div className='hidden sm:block'><Sidebar value={clanData && clanData.creator == currentUser._id}/></div>
      <div className='w-full'>
        {page == 1 && <MainContent2/> }
        {page == 3 && <MainContent/> }
        {page == 2 && <MainContent1/> }
        
      </div>
      {clanData && clanData.creator === currentUser._id && <div className='hidden '><RequestList/></div>}
    </div>
  )
}

export default ClanChat