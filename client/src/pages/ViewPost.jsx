import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);


  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/view-post/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        setPost(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post || !currentUser) return;

    try {
      if (!comment) {
        toast.error("Message is empty")
        return;
      }

      const res = await fetch(`/api/post/update-comments-post/${params.id}`, {
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



  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card card-side bg-base-100 shadow-xl w-1/2 flex flex-col">
        <div className="card-body">
          <p>{post.details}</p>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {post.image && post.image.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item} alt="Image" className='min-h-24' />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <p>Comment:</p>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write something"
            value={comment}
            onChange={handleCommentChange}
          />
          <button type="submit">Send</button>
        </form>
        <div>
          <p>comments</p>
          {post.comments && post.comments.map((comment, index) => {
            return (
              <div key={index}>
                <button onClick={openDialog}>{comment.user.name}</button>
                <dialog ref={dialogRef}>
                  <Link to={`/view-clan/${comment.user.clan}`}>View Clan</Link>
                  <p>Message</p>
                  <button onClick={closeDialog}>Close</button>
                </dialog>
                {comment.content && comment.content.map((content, ind) => {
                  return (
                    <div key={ind}>
                      {content}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
