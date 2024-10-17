import React, { useState } from 'react'
import toast from "react-hot-toast"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clanjoin } from '../Redux/user/userSlice.js'

const CreateClan = () => {
  
  const {currentUser} = useSelector(state=>state.user)
  const [formData,setFormData] = useState( {
    ["creator"]: currentUser._id
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.id]: e.target.value}
    )
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/clan/create-clan",{
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      if(data.success === false) {
        toast.error("Error creating clan");
        return;
      }
      toast.success("Successfully created");
      dispatch(clanjoin(data._id));
      navigate(`clan/${data._id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <p className='text-center font-cursive'>Create Clan</p>
        <span>
          <p>Enter name of the clan</p>
          <input id='name' onChange={handleChange} type="text" placeholder='Enter clan name' className='px-2 py-3 border-2 border-slate-200'/>
        </span>
        <span>
          <p>Enter description</p>
          <textarea id='description' onChange={handleChange} placeholder='Enter description' className='px-2 py-3 border-2 border-slate-200'></textarea>
        </span>
        <span>
          <p>Add members</p>
          <input id='members' onChange={handleChange} type="search" placeholder='Search the names' className='px-2 py-3 border-2 border-slate-200'/>
        </span>
        <button type='submit' className="btn btn-primary uppercase">Create</button>
      </form>
    </div>
  )
}

export default CreateClan
