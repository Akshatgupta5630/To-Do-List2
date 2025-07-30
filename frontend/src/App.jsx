import './App.css';
import { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/todoApi';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo({ title: newTitle });
    setNewTitle('');
    loadTodos();
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo._id, { isCompleted: !todo.isCompleted });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleEditClick = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const handleEditSave = async (id) => {
    await updateTodo(id, { title: editTitle });
    setEditId(null);
    setEditTitle('');
    loadTodos();
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.isCompleted ? 'completed' : ''}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggle(todo)}
              />
              {editId === todo._id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginLeft: '0.5rem', flex: 1 }}
                />
              ) : (
                <span style={{ marginLeft: '0.5rem', flex: 1 }}>
                  {todo.title}
                </span>
              )}
            </div>
            {editId === todo._id ? (
              <button onClick={() => handleEditSave(todo._id)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(todo)}>Edit</button>
            )}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
