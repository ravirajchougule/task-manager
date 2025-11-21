
import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { ulid } from "ulid";

const Login = ({ onLoginSuccess }) => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const encrypt = (text) => btoa(unescape(encodeURIComponent(text)));

  
  const [{ clientToken, serverToken }, setTokens] = useState({
    clientToken: `X${ulid()}`,
    serverToken: ''
  });

  
  useEffect(() => {
    const doPreValidate = async () => {
      const res = await fetch('https://dev.cloudio.io/v1/x', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Application': 'SignIn',
          'Content-Type': 'application/json',
          'X-Token': clientToken,
        },
        body: JSON.stringify({ x: clientToken })
      });

      const data = await res.json();
      setTokens({ clientToken, serverToken: data.x });
    };

    doPreValidate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const finalToken = clientToken + serverToken;
      console.log("Final Token:", finalToken);

      const authResponse = await fetch('https://dev.cloudio.io/v1/auth', {
        method: 'POST',
        credentials: 'include',  
        headers: {
          'X-Application': 'SignIn',
          'Content-Type': 'application/json',
          'X-Token': finalToken,
        },
        body: JSON.stringify({
          un: encrypt(email.trim()),
          pw: encrypt(password.trim()),
          is_admin_url: false,
          is_native_login: true,
        })
      });

      const authData = await authResponse.json();
      console.log("Auth Response:", authData);

      if (authData.status === 'OK') {
        localStorage.setItem(
          'user',
          JSON.stringify({ email, x: authData.x, jwt: authData.jwt })
        );
        onLoginSuccess();
        navigate('/home');
      } else {
        throw new Error(authData.message || 'Login failed');
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Task Manager</h1>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="input"
          id="email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;


