import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ViewClan = () => {
    const [clanDetails, setClanDetails] = useState(null);
    const [message, setMessage] = useState('');

    const params = useParams();

    const fetchClan = async () => {
        try {
            const res = await fetch(`/api/clan/getclan/${params.id}`)
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message);
                return;
            }
            setClanDetails(data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchClan();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            toast.error("Please enter a message");
            return;
        }
    
        try {
    
          const res = await fetch(`/api/create-message/${clanDetails.creator}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"content":message}),
          });
          const data = await res.json();
          if(data.success === false) {
            toast.error(data.message);
            return;
          }
          console.log(data);
          setMessage('');
          toast.success("Message sent")
        } catch (error) {
          toast.error(error.message);
        }
      };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    return (
        <div>
            {clanDetails &&
                <div className='flex flex-col'>
                    <p>Name : {clanDetails.name}</p>
                    <p>Details : {clanDetails.description}</p>
                    <span>
                        members : {clanDetails.members && clanDetails.members.map((member, ind) => {
                            return (
                                <div key={ind}>
                                    <p>name : {member.name}</p>
                                </div>
                            )
                        })}
                    </span>
                </div>

            }

            <p>message</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Type message' value={message}
                    onChange={handleMessageChange} />
                <button type='submit'>send</button>
            </form>
        </div>
    )
}

export default ViewClan