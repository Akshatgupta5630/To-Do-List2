import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/todos';

export const getTodos = () => axios.get(API_BASE);
export const addTodo = (todo) => axios.post(API_BASE, todo);
export const updateTodo = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteTodo = (id) => axios.delete(`${API_BASE}/${id}`);
