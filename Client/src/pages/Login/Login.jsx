import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      navigate('/AdminPanel');  
    } else {
      alert('İstifadəçi adı və ya şifrə yanlışdır');
    }
  };

  return (
    <div className="login-container">
      <h1>Admin panel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Login</label>
        <input
          type="text"
          
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
         
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
