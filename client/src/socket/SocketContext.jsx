import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
	const { currentUser } = useSelector(state=>state.user);

	


	useEffect(() => {
		if (currentUser) {
			const socket = io("http://localhost:4400",{
				query: {
					userId: currentUser._id,
				},
			});

			setSocket(socket);


			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [currentUser]);
	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}

export default SocketContextProvider
