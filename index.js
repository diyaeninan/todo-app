const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for TODOs
let todos = [];
let nextId = 1;

// Helper function to find TODO by ID
const findTodoById = (id) => {
  return todos.find(todo => todo.id === parseInt(id));
};

// GET all TODOs
app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: todos
  });
});

// GET a specific TODO by ID
app.get('/todos/:id', (req, res) => {
  const todo = findTodoById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'TODO not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST - Create a new TODO
app.post('/todos', (req, res) => {
  const { title, description, completed } = req.body;
  
  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description || '',
    completed: completed || false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    data: newTodo
  });
});

// PUT - Update a TODO
app.put('/todos/:id', (req, res) => {
  const todo = findTodoById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'TODO not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  // Update only provided fields
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title cannot be empty'
      });
    }
    todo.title = title.trim();
  }
  
  if (description !== undefined) {
    todo.description = description;
  }
  
  if (completed !== undefined) {
    todo.completed = completed;
  }
  
  todo.updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: todo
  });
});

// DELETE a TODO
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'TODO not found'
    });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedTodo
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TODO API',
    endpoints: {
      'GET /todos': 'Get all TODOs',
      'GET /todos/:id': 'Get a specific TODO',
      'POST /todos': 'Create a new TODO',
      'PUT /todos/:id': 'Update a TODO',
      'DELETE /todos/:id': 'Delete a TODO'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TODO API Server is running on port ${PORT}`);
});

module.exports = app;
