import React, { useState } from 'react';
import apiClient from '../api/apiClient'; 

const Signup = ({ setIsSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.signup(name, email, password);
      console.log('Signup successful', response);
      // Redirect to login page or task manager page
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />
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
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <span
          onClick={() => setIsSignUp(false)}
          className="text-blue-500 cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
