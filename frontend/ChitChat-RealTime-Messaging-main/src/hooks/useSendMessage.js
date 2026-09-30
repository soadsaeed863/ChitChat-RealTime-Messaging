import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
const useSendMessage = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedContact } = useChatContext();

  const sendMessage = async (message) => {
    setLoading(true);
    const payload = { message: message, receiverIds: [selectedContact._id] };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_Back_END_Host}/sendMessage`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("the message: 🥳", data);
      setMessages((prevMessages) => [...prevMessages, ...data]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
