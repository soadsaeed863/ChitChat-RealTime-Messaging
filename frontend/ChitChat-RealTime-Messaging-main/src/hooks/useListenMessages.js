import { useEffect } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { useSocketContext } from "../contexts/SocketContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChatContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket.off("newMessage");
  }, [socket, setMessages]);
};

export default useListenMessages;
