import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  if (todos.length === 0) {
    return <p className="no-todos">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="todo-list">
      <h2>My Tasks</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;