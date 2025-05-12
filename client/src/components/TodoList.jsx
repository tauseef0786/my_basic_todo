import React, { useState, useEffect } from 'react';
import { apiClient } from '../apiClint';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import Form from './Form';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your todos.');
          return;
        }
        const response = await apiClient.get('/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
      }
    };

    fetchTodos();
  }, []);

  const handleAddOrUpdateTodo = (todoData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add/update todos.');
      return;
    }

    const formData = {
      title: todoData.title,
      description: todoData.description,
      priority: todoData.priority,
      status: todoData.status,
    };

    const addTodo = async () => {
      try {
        const response = await apiClient.post('/todos', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos([...todos, response.data]);
        setSuccess('Todo added successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Error adding todo:', error);
        setError('Failed to add todo. Please try again later.');
        setTimeout(() => setError(null), 3000);
      }
    };

    const updateTodo = async () => {
      try {
        const response = await apiClient.patch(`/todos/${editingTodo._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(todos.map((todo) => (todo._id === editingTodo._id ? response.data : todo)));
        setSuccess('Todo updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Error updating todo:', error);
        setError('Failed to update todo. Please try again later.');
        setTimeout(() => setError(null), 3000);
      }
    };

    if (editingTodo) {
      updateTodo();
    } else {
      addTodo();
    }

    setShowForm(false);
    setEditingTodo(null);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to delete todos.');
        return;
      }

      await apiClient.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setSuccess('Todo deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again later.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-600 transition"
          >
            <FaPlusCircle className="inline mr-2" /> Add New Todo
          </button>
        </div>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {success && <p className="mt-4 text-green-600 text-center">{success}</p>}

        {todos.length === 0 ? (
          <p className="mt-6 text-center text-gray-500">No todos available.</p>
        ) : (
          <ul className="space-y-4 mt-6">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-800">{todo.title}</h4>

                <p className="text-gray-600">
                  Status:{' '}
                  <span className={todo.status ? 'text-green-500' : 'text-red-500'}>
                    {todo.status ? 'Completed' : 'Pending'}
                  </span>
                </p>

                <p className="text-gray-500">
                  Priority:{' '}
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityStyles(todo.priority)}`}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                </p>

                <p className="text-gray-500 mt-1">Description: {todo.description}</p>

                <div className="flex justify-end space-x-4 mt-3">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="text-cyan-600 hover:text-cyan-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {showForm && (
          <Form
            todo={editingTodo}
            onClose={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
            onSubmit={handleAddOrUpdateTodo}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
