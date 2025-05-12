import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Import the useTheme hook

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const { theme, toggleTheme } = useTheme(); // Get the current theme and toggle function

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-white ${scrolled ? 'shadow-md' : ''} fixed top-0 left-0 w-full z-10`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TodoApp
        </Link>

        <ul className="flex space-x-6 items-center">
          {/* Home Link */}
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
          </li>

          {/* Todos Link (only show if logged in) */}
          {isLoggedIn && (
            <li>
              <Link to="/todos" className="text-gray-700 hover:text-blue-600 font-medium">
                Todos
              </Link>
            </li>
          )}

          {/* Logout or Login/Register Links */}
          {isLoggedIn ? (
            <li>
              <span
                onClick={handleLogout}
                className="text-gray-700 cursor-pointer hover:text-red-600 font-medium"
              >
                Logout
              </span>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                  Register
                </Link>
              </li>
            </>
          )}

          {/* Day/Night Mode Icon */}
          <li>
            <span
              onClick={toggleTheme} // Toggle theme when clicked
              className="cursor-pointer text-xl"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '🌞'} {/* Moon for dark mode, Sun for light mode */}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
