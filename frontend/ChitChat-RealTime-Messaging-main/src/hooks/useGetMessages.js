import { useEffect, useState } from "react";
import { useChatContext } from "../contexts/ChatContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedContact } = useChatContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_Back_END_Host}/getMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ userToChatIds: selectedContact._id }),
          }
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
        console.log(data);
      } catch (error) {
        alert(error.messages);
      } finally {
        setLoading(false);
      }
    };
    if (selectedContact?._id) getMessages();
  }, [selectedContact._id, setMessages]);
  return { messages, loading };
};
export default useGetMessages;
