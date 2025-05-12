import React, { useState } from 'react';
import { apiClient } from '../apiClint';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setErrorMsg('All fields are required');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await apiClient.post('/users/register', {
        userName,
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Registered & Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMsg('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      
      <form
        onSubmit={handleRegister}
        className="mt-10 w-full max-w-sm space-y-4 text-center"
      >
        {errorMsg && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
        />

        <button
          type="submit"
          className="w-fit mx-auto bg-cyan-500 text-white px-6 py-2 rounded shadow-md hover:bg-cyan-600"
        >
          REGISTER
        </button>

        <p className="text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
