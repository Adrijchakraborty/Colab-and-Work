import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CiLocationArrow1 } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MainContent2 = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');

  const { currentUser } = useSelector(state => state.user)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/post/getallposts');
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setAllPosts(data);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleCommentSubmit = async (e, id) => {
    e.preventDefault();

    try {

      const res = await fetch(`/api/post/update-comments-post/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comments: {
            "user": currentUser._id,
            "content": comment
          }
        }),
      });
      const data = await res.json();
      setPost(data);
      setComment('');
      toast.success("Comment sent")
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  if(!allPosts) {
    <div>No posts to show</div>
  }
  return (

    <div className= 'py-4 flex flex-col items-center gap-4 max-h-screen overflow-auto'>
      {allPosts.map((items, index) => {
        return (
            
            <div key={index} className='bg-slate-200 shadow-lg shadow-indigo-500/40 cursor-pointer p-3 w-[450px] '>
              <p className='mb-4'>{items.userRef && items.userRef.name} posted</p>
              <Link to={`/view-post/${items._id}`} >
              <p className='py-2'>{items.details}</p>
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
              >
                {items.image && items.image.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={item} alt="Image" className='min-h-48' />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              </Link>
              <form className='py-4 flex gap-2' onSubmit={(e) => handleCommentSubmit(e, items._id)}>
                <input type="text" placeholder='Write comment' onChange={handleCommentChange} className='p-2'/>
                <button type="submit" className='text-3xl '><CiLocationArrow1 /></button>
              </form>
            </div>

          
        )
      })}
    </div >
  )
}

export default MainContent2