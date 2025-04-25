import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API URL - adjust the port to match your backend
  const API_URL = 'http://localhost:3000/api/todos';

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);
      setTodos([response.data, ...todos]);
      setError('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  // Toggle todo completion
  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !currentStatus
      });
      
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
      setError('');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Update todo
  const updateTodo = async (id, updateData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updateData);
      
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
      setError('');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Todo App</h1>
      </header>
      
      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        
        <TodoForm addTodo={addTodo} />
        
        {loading ? <LoadingSpinner /> : (
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;