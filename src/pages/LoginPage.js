import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import authService from "../services/auth.service";

// const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    // axios.post(`${API_URL}/auth/login`, requestBody)
    authService.login(requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );

        // Save the token in the localStorage.    
        storeToken(response.data.authToken);

        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 
        authenticateUser(); 
      
        navigate('/');                          
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
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
      src='/assets/pullups video.mp4'
      type='video/mp4'
      >
      </video> */}
      <img 
        src='/assets/pexels-olly-868704.jpg'
        alt='Fitness Background'
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div style={{marginBottom: '50px'}} className='outer-form-page-cnt'>
      <div className='form-page-cnt'>
        <h1>Login</h1>

        <form className='form' onSubmit={handleLoginSubmit}>

          <div className='label-input-div'>
            <label>Email:</label>
            <input 
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className='label-input-div'>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button id='login-btn' className='login-signup-btn' type="submit">Login</button>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p>Don't have an account yet?</p>
        <Link className='login-signup-btn' to={"/signup"}> Sign Up</Link>
      </div> 
    </div>
    </>
  )
}

export default LoginPage;
