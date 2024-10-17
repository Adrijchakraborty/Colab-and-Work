import React from 'react'

const FriendList = ({value}) => {
    const {chats,currentUser,handleChange} = value;
    return (
        <div>
            {chats && chats.map((items, index) => {
                return (
                    <div key={index} onClick={()=>handleChange(items)}>
                        Name : {items.participants[0]._id == currentUser._id ? items.participants[1].name : items.participants[0].name}
                    </div>
                )
            })}
        </div>
    )
}

export default FriendList