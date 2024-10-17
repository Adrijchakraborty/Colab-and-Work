import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import toast from 'react-hot-toast'
import PersonalChats from './PersonalChats';
import FriendList from './FriendList';

const ClientChat = () => {
    const [chats,setChats] = useState([]);
    const [state,setState] = useState(false);
    const [item,setItem] = useState(false);
    const {currentUser} = useSelector(state=>state.user)

    const fetchChats = async() => {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            if(data.success === false) {
                toast.error(data.message);
                return;
            }
            setChats(data);
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() =>{
        fetchChats();
    },[])

    const handleChange = (item)=>{
        setState((prev)=>!prev);
        setItem(item);
    }

    if(!chats) return <div>Loading...</div>

    return (
        <div>
            {state ? <PersonalChats value={{currentUser,item,handleChange}}/> : <FriendList value={{chats,currentUser,handleChange}}/>}
        </div>
    )
}

export default ClientChat