import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const ClientPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/post/getposts');
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
            }
            setPosts(data);
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])
    if(!posts) return <div>Loading</div>;
    return (
        <div>
            <h2>Your posts</h2>
            <div>
                {posts && posts.map((items, index) => {
                    return (
                        <div key={index} className='bg-pink-400 cursor-pointer'>
                            <Link to={`/view-post/${items._id}`} >{items.details}</Link>
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
                                            <img src={item} alt="Image" className='min-h-24' />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ClientPosts