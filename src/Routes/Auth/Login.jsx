import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowHidePassword from "../../components/ShowHidePassword";
import { userLoginAsync } from "../../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLoginForm = async (event) => {
    event.preventDefault();
    try {
          console.log("Email:" ,email, "password",password)
      await dispatch(userLoginAsync({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  const guestLoginHandler = async () => {
    const email_Guest = "guest@example.com"
    const password_Guest = "guest12345"
     setEmail(email_Guest);
    setPassword(password_Guest);

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card  border-0 p-4  bg-body-tertiary"
       
      >
        
        <h3 className="text-center">Anvaya</h3>
        <p className="text-center text-muted mb-4">Log in your account here</p>      

        <form onSubmit={handleUserLoginForm}>
          <label htmlFor="email" className="form-label fw-semibold">Email</label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label fw-semibold">Password</label>

          <ShowHidePassword  value={password} onChange={(event)=>setPassword(event.target.value)}/>

          <div className="d-grid my-2">
            <button className="btn btn-primary " type="submit">
              Sign in
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              className="btn btn-outline-secondary"
              onClick={guestLoginHandler}
            >
              Guest Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? <Link to="/register" className="text-decoration-none fw-semibold ">SignUp</Link>
          </p>
        </form>

        <Toaster />
      </div>
    </div>
  );
}

export default Login;
