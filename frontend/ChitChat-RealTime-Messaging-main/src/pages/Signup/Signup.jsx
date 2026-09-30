import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import useSignup from "../../hooks/useSignup";

export const Signup = () => {

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });


  const { loading, signup } = useSignup();
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData, setErrors);
    
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <p>{errors.userName}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.password && <p>{errors.password}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
