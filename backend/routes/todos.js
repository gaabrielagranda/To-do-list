const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({createdAt: -1});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
  });

  // Get single todo
  router.get('/:id', async (req, res) =>{
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
  });

  // Create to do 
  router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });

  // Update todo
  router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (req.body.title) todo.title = req.body.title;
        if (req.body.description !== undefined) todo.description = req.body.description;
        if (req.body.completed !== undefined) todo.completed = req.body.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
  });

  // Delete todo
  router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await todo.deleteOne();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
  });

  module.exports = router;