import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowHidePassword from "../../components/ShowHidePassword";
import { registerUserAsync, userLoginAsync } from "../../features/userSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLoginForm = async (event) => {
    event.preventDefault();
    try {
        await dispatch(registerUserAsync({ name, email, password })).unwrap();
      toast.success("Sighup successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card  border-0 p-4  bg-body-tertiary">
        <h3 className="text-center">Anvaya</h3>
        <p className="text-center text-muted mb-4">Create an account here</p>

        <form onSubmit={handleUserLoginForm}>
          <label htmlFor="name" className="form-label fw-semibold mb-1">
            Name
          </label>
          
          <input
            className=" form-control"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="form-label fw-semibold">
            Email
          </label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>

          <ShowHidePassword
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="d-grid my-2">
            <button className="btn btn-primary " type="submit">
              Sign up
            </button>
          </div>
      
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none fw-semibold ">
              Login
            </Link>
          </p>
        </form>

        <Toaster />
      </div>
    </div>
  );
}

export default Register;
