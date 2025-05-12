import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      {/* Add margin-top to avoid content being hidden behind the Navbar */}
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/todos/edit/:todoId" element={<TodoPage />} />  {/* Edit route */}
          <Route path="/todos/add" element={<TodoPage />} />  {/* Add route */}
          {/* Optional 404 page for unknown routes */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
