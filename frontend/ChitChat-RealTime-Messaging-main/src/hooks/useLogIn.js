import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";

function useLogIn() {
  const [loading, setLoading] = useState(false);
  const { validateUser } = useAuthContext();
  const login = async (values) => {
    console.log("The credentials", values);
    try {
      const res = await fetch(`${import.meta.env.VITE_Back_END_Host}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.errors) {
        alert("Login failed");
        return;
      }
      console.log("Log In info: 😭", data);

      validateUser(data);
      // localStorage.setItem("authUser", JSON.stringify(data.token));
      // setAuthUser(data.token);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogIn;