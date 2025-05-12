import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white"> {/* Change bg-gray-50 to bg-white */}
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Todo App</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Organize your tasks efficiently, prioritize what's important, and track your progress with ease. 
          Get started by creating your first todo!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
