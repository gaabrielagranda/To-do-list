import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = () => {
    if (!editTitle.trim()) return;
    
    updateTodo(todo._id, {
      title: editTitle,
      description: editDescription
    });
    
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-input"
            placeholder="Description"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="btn btn-success">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-info">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              className="todo-checkbox"
            />
            <div className="todo-text">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && <p className="todo-description">{todo.description}</p>}
            </div>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">Edit</button>
            <button onClick={() => deleteTodo(todo._id)} className="btn btn-delete">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;