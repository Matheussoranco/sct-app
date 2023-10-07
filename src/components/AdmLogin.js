
import React, { useState } from 'react';
import '../admLogin.css'; // Import a CSS file for styling

const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would perform authentication here
    // For this example, let's assume username: "admin" and password: "password"
    if (username === 'adm' && password === '123') {
      
      setLoggedIn(true);
      onAdminLogin(true); // Call the callback function with the login status
  
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <h2  className="admin-login-heading">Adm Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-login-heading">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            className="admin-input" // Add a class for styling
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="admin-login-heading">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            className="admin-input" // Add a class for styling
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button className="button-size" type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;