import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePost = () => {
    const [post,setPost] = useState({
        userRef:""
    })

    const {currentUser} = useSelector(state=>state.user)

    const handleChange = (e)=>{
        setPost({...post,
            [e.target.id]: e.target.value
        })
    }
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create-post',{
                method: 'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify({
                    ...post,
                    userRef:currentUser._id
                })
            })

            const data = await res.json();
            console.log(data);
            if(data.success === false) {
                toast.error("Post not created");
                return;
            }
            toast.success("Post created successfully")
            navigate(`/view-post/${data._id}`);
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center gap-5 py-5'>
            <h2 className='font-cursive text-2xl'>Create a post</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <span>
                    <h3 className='font-vic text-lg'>Upload an image :</h3>
                    <input id="image" type="file" placeholder='Upload an image' />
                </span>

                <span>
                    <h3 className='font-vic text-lg'>Description :</h3>
                    <textarea onChange={handleChange} id="details" rows="10" cols="50" placeholder='Enter description' required className='p-2 border-2 border-slate-500 rounded-md'/>
                </span>
                <button className="btn btn-neutral w-1/2 self-center uppercase">post</button>
            </form>
        </div>
    )
}

export default CreatePost