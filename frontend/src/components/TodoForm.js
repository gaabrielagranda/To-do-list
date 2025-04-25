import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTodo({title, description});
        setTitle('');
        setDescription('');
    };

    return (
        <div className='todo-form'>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                    type="text"
                    placeholder="Task Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    required
                    />
                </div>
                <div className="form-group">
                    <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};
export default TodoForm;