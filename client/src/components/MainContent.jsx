import React, { useContext, useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { SocketContext } from '../socket/SocketContext';


const MainContent = () => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const {socket} = useContext(SocketContext)

  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
			setAllMessages([...allMessages, newMessage]);
		});
		socket?.off("newMessage");
    fetchMessages();
  }, [socket,allMessages,setAllMessages])

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/message/${currentUser.clan}`)
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setAllMessages(data)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleChange = (e) => {
    setMessage(
      e.target.value
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) {
      toast.error("Message is empty");
      return;
    }
    try {
      const res = await fetch(`/api/create-message/${currentUser.clan}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({"content":message})
      })

      const data = await res.json()

      if (data.success === false) {
        toast.error(data.message)
        return;
      }
      setMessage('')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <div className='w-full px-3 sm:w-[45vw] sm:px-0 mx-auto'>
        <div className='h-[85vh] overflow-scroll'>
          {allMessages.map((items, index) => {
            return (
              <div key={index} className={`chat ${currentUser.email == items.sender.email ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-header">
                  {items.sender.name}
                </div>
                <div className="chat-bubble">{items.content}</div>
              </div>
            )
          })}
        </div>
        <form onSubmit={handleSubmit} className='flex gap-3'>
          <input onChange={handleChange} type="text" value={message} placeholder='Type here' className='w-full p-2' />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MainContent