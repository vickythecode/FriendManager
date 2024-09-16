import React, { useState } from 'react';
import authService from '../services/authService';
import './Auth.css'; // Import the CSS file

const Auth = ({ setToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = isLogin
        ? await authService.login(form)
        : await authService.signup(form);
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="auth-switch-button"
      >
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;
