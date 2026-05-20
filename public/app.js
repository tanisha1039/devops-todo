const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

async function fetchTodos() {
  const response = await fetch('/api/todos');
  const todos = await response.json();
  renderTodos(todos);
}

function createTodoElement(todo) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  if (todo.completed) {
    item.classList.add('completed');
  }

  const label = document.createElement('span');
  label.textContent = todo.text;
  label.addEventListener('click', () => toggleTodo(todo.id, !todo.completed));

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTodo(todo.id));

  item.appendChild(label);
  item.appendChild(deleteButton);
  return item;
}

function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });
}

async function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  todoInput.value = '';
  fetchTodos();
}

async function toggleTodo(id, completed) {
  await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  fetchTodos();
}

addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

fetchTodos(
