// src/AdminLogin.js
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

  if (loggedIn) {
    return <div>Welcome, Admin!</div>;
  }

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="admin-input" // Add a class for styling
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;