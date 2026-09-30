import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { invalidateUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_Back_END_Host}/logout`, {
        method: "GET", // Use GET to match the backend
        headers: { "Content-Type": "application/json" },
        credentials: "include", // This ensures cookies are sent
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      invalidateUser();
      console.log("You logged out");
      // localStorage.removeItem("authUser");
      // setAuthUser(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
}

export default useLogout;