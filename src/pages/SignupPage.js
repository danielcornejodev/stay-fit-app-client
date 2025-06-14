// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

// const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService.signup(requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(errorDescription);
      });
  };

  
  return (
    <>
    <div>
      {/* <video 
      width="100%" 
      loop
      muted
      autoPlay
      preload='auto'
      src='/assets/video (2160p) woman squats.mp4'
      type='video/mp4'
      >
      </video> */}
      <img 
        src='/assets/pexels-willpicturethis-1954524.jpg'
        alt='Fitness Background'
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div style={{marginBottom: '50px'}} className="outer-form-page-cnt">
      <div className="form-page-cnt">
        <h1>Sign Up</h1>

        <form className='form' onSubmit={handleSignupSubmit}>
          <div className="label-input-div">
            <label>Email:</label>
            <input 
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          
          <div className="label-input-div">
            <label>Password:</label>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <div className="label-input-div">
            <label>Name:</label>
            <input 
              type="text"
              name="name"
              value={name}
              onChange={handleName}
            />
          </div>
          <button id='signup-btn' className='login-signup-btn' type="submit">Sign Up</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p>Already have account?</p>
        <Link className='login-signup-btn' to={"/login"}> Login</Link>
      </div>
    </div>
    </>
  )
}

export default SignupPage;
