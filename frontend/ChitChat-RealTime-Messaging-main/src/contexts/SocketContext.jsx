import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    console.log("the user id❤️❤️:", authUser?.user?._id);
    if (authUser?.user?._id) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser.user._id, // authUser = {user:{}, token:{}}
        },
      });

    
      // Listen for connection
      socket.on("connect", () => {
        console.log("😶‍🌫️😶‍🌫️ SSocket connected:", socket.id); // Log the socket ID
      });
      //   listen to events
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      setSocket(socket);
      return () => socket.close(); // close socket on component unount
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
