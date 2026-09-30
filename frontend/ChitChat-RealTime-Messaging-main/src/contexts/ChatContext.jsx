import { createContext, useContext, useState } from "react";

export const chatContext = createContext();

export const useChatContext = () => {
  return useContext(chatContext);
};
export const ChatContextProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <chatContext.Provider
      value={{ selectedContact, setSelectedContact, messages, setMessages }}
    >
      {children}
    </chatContext.Provider>
  );
};
