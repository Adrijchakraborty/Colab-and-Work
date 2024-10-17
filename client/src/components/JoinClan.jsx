import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"

let skip = 0;
const limit = 6;

const JoinClan = () => {

  const [clanData,setClanData] = useState([]);

  

  const fetchClans = async()=>{
    try {
      const res = await fetch(`/api/clan/getclans?limit=${limit}&skip=${skip}`);
      const data = await res.json();
      skip += limit;
      if(data.success === false) {
        toast.error("Error getting clans");
        return;
      }
      console.log(skip,data)
      setClanData(prevData => [...prevData, ...data]);
    } catch (error) {
      toast.error(error.message)
    }
  }
  console.log(clanData)
  useEffect(() =>{
    fetchClans();
  },[])

  const handleRequest = async(value) =>{
    try {
      const res = await fetch(`/api/req/send-req/${value}`,{
        method: 'POST',
        headers: {'content-type': 'application/json'}
      })

      const data = await res.json();
      if(data.success === false) {
        toast.error("Request was not successful");
        return;
      }

      toast.success("Request was successful");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <span>
        <p>Search a clan</p>
        <input type="search" placeholder='Enter a name' />
      </span>
      <div className='grid grid-cols-3 gap-4 border-2 border-slate-900 h-[50vh] overflow-scroll p-3'>
          {clanData && clanData.map((items,index)=>{
            return (
              <div key={index}>
                <p>Name : {items.name}</p>
                <p>description : {items.description}</p>
                <button onClick={()=>handleRequest(items._id)}>Send Request</button>
              </div>
            )
          })}
      </div>
      <button onClick={fetchClans}>Load More</button>
    </div>
  )
}

export default JoinClan