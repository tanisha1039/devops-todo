const express = require('express');
const path = require('node:path');

const app = express();
app.use(express.json());

const todos = [
  { id: 1, text: 'Welcome! Add a new todo.', completed: false },
];
let nextId = 2;

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const text = String(req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'Todo text is required.' });
  }

  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  if (typeof req.body.completed === 'boolean') {
    todo.completed = req.body.completed;
  }
  if (typeof req.body.text === 'string') {
    todo.text = req.body.text.trim();
  }

  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Todo app running at http://localhost:${port}`);
});