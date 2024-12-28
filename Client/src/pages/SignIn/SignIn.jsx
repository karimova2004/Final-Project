import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; 

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
alert("qeydiyyatdan keçdiniz")
    navigate('/'); 
  };

  return (
    <div className="signin-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Login">Login</label>
        <input
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
         
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Qeydiyyatdan Keç</button>
      </form>
    </div>
  );
};

export default SignIn;
