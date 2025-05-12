import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../apiClint';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await apiClient.post('/users/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/todos');
      } else {
        setErrorMsg('Login failed: Token not received');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMsg(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      
      <form
        onSubmit={handleLogin}
        className="mt-10 w-full max-w-sm space-y-4 text-center"
      >
        {errorMsg && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Username"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
        />

        <button
          type="submit"
          className="w-fit mx-auto bg-cyan-500 text-white px-6 py-2 rounded shadow-md hover:bg-cyan-600"
        >
          SUBMIT
        </button>

        <p className="text-sm mt-4">
          Not registered yet, <Link to="/register" className="text-black font-medium">Register Now</Link>
        </p>

        <Link to="/register">
          <button
            type="button"
            className="mt-2 bg-cyan-500 text-white px-6 py-2 rounded shadow-md hover:bg-cyan-600"
          >
            REGISTER
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
