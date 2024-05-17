import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useAuthorization } from './AuthorizationContext';
import { Link } from 'react-router-dom';

const Login = ({onLoginSuccess}) => {
  const { login } = useAuthorization();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to your login endpoint
      const response = await axios.post('http://localhost:5001/login', { email, password });
      
      // Assuming successful login returns user data
      const userData = response.data.user;
      console.log(userData)
      // Call your login function with user data
      login(userData);

      // Redirect to the desired page upon successful login
      onLoginSuccess('/usercourses');
    } catch (error) {
      // Handle error responses from the server
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ padding: '3vw' }}>
      <h2 className="text-center mb-4" style={{ width: '100%', fontSize: '1.5em' }}>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', fontSize: '1.6em' }}>Login</button>
      <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
    </div>
  );
};

export default Login;
