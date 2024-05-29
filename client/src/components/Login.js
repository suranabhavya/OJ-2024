
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./css/register.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );                                          // THis is making a BE call to the /auth/login API, while passing the headers using withCredentials: true
      const { success, message } = data;          // Deconstructing data to get success and message
      if (success) {                              // We are handling success condition
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);    
      } else {                                    // Handline error conditioin
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: ""
    });
  };

  return (
    <div className="signupfull">
    <div className="form_container1 form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="email" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label className="email" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button className="sub1" type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/register"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;
