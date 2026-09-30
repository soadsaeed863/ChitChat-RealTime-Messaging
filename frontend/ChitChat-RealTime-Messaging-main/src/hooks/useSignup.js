import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let validInputs = true;

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { validateUser } = useAuthContext();
  const signup = async (formData, setErrors) => {
    const { userName, email, password } = formData;
    handleInputErrors(formData, setErrors);
    if (!validInputs) return;

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_Back_END_Host}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      console.log("Kellow");
      const data = await res.json();
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      console.log(data);

      validateUser(data);
      // // Save token:
      // localStorage.setItem("authUser", JSON.stringify(data.token));
      // setAuthUser(data.token);
    } catch (error) {
      // Handle any other unexpected errors that may occur
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors(formData, setErrors) {
  const { userName, email, password } = formData;
  const newErrors = { userName, email, password };
  if (!userName) {
    validInputs = false;
    newErrors.userName = "Enter a user name.";
  }
  if (!email || !email.match(validRegex)) {
    validInputs = false;
    newErrors.email = "Enter a valid email.";
  }
  if (!password || password.length < 8) {
    validInputs = false;
    newErrors.password = "Password can't be less than 8 characters.";
  }

  setErrors(newErrors);
}