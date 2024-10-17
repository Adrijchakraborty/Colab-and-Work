import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const RequestList = () => {
  const [request,setRequest] = useState([])
  const [member,setMember] = useState()

  const {currentUser} = useSelector(state=>state.user)

  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/req/getreq/${currentUser.clan}`);
  
      const data = await res.json();
      setRequest(data);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  
  useEffect(() =>{
    fetchRequest();
  },[])

  const handleAccept = async(id)=>{
    
    try {
      const res = await fetch(`/api/clan/add-members/${currentUser.clan}`,{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({members:[id]})
      })

      const data = await res.json();
      if(data.success === false) {
        toast.error(data.message);
        return;
      }

      toast.success("Request Accepted");

    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleReject = async(id)=>{
    try {
      const res = await fetch(`/api/req/reject-req/${id}`,{
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
      })
      const data = await res.json();
      if(data.success === false) {
        toast.error(data.message)
        return;
      }

      toast.success("Request deleted");
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h1>Request List</h1>
      {request.map((items,index)=>{
        return (
          <div key={index} className='bg-sky-400 border-2 border-slate-700 rounded-md'>
            <p>name : {items.sender.name}</p>
            <div className='flex justify-around'>
            <button onClick={()=>handleAccept(items.sender._id)}>Accept</button>
            <button onClick={()=>handleReject(items._id)}>Reject</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RequestList