import React, { useState } from 'react';
import apiClient from '../api/apiClient'; 
const Login = ({ setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.login(email, password);
      console.log('Login successful', response);
      // Redirect to task manager page or wherever you want
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <span
          onClick={() => setIsSignUp(true)}
          className="text-blue-500 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
