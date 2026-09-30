import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useChatContext } from "./ChatContext";
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const { setSelectedContact } = useChatContext();
  const [authUser, setAuthUser] = useState(() => {
    const storedAuthUser = Cookies.get("jwt");
    if (storedAuthUser) {
      const payloadBase64 = storedAuthUser.split(".")[1]; // Get the payload part
      const decodedPayload = atob(payloadBase64); // Decode the Base64 part
      return JSON.parse(decodedPayload); // Parse the JSON to get user info
    }
    return null; // No user found
  });

  const validateUser = (userData) => {
    // login functionality
    Cookies.set("jwt", userData.token, {
      expires: 7,
      // secure: true  //* Commented until production
    });
    // const decodedPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload to get user info
    setAuthUser(userData);
    // setAuthUser(JSON.parse(atob(token.split(".")[1]))); // Decode JWT payload to get user info
  };

  const invalidateUser = () => {
    // logout functionality
    Cookies.remove("jwt");
    setAuthUser(null);
    setSelectedContact(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser, // User Object and tocken
        setAuthUser, // set flag
        validateUser, // login functionality
        invalidateUser, // logout functionality
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};