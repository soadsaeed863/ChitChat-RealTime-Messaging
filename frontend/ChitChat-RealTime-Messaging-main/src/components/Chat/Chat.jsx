import { useState } from "react";
import styles from "./Chat.module.css";
import Messages from "../Messages/Messages";
import { useChatContext } from "../../contexts/ChatContext";
import useSendMessage from "../../hooks/useSendMessage";


const Chat = () => {
  const [input, setInput] = useState("");
  const { messages, selectedContact, setMessages } = useChatContext();
  const { sendMessage } = useSendMessage();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input) {
      await sendMessage(input);
        // const newMessage = { text: input, isUser: true };
        // setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInput("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <Messages
       
        contactName={selectedContact ? selectedContact.userName : ""}
      />

      <form onSubmit={handleSendMessage} className={styles.chatForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className={styles.chatInput}
        />
        <button type="submit" className={styles.chatButton}>
          <i
            className="fa-solid fa-paper-plane"
            style={{ color: "#9049bf" }}
          ></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
