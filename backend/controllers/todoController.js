const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });    
    res.json(todos)
}

const createTodo = async (req, res) => {
    const { title } = req.body;
    const todo = Todo.create({title});
    res.status(201).json(todo);
}

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    const todo = await Todo.findByIdAndUpdate(id, { title, isCompleted }, { new: true });
    res.json(todo);
}

const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
};


module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};