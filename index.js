const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(express.json());
// MongoDB connection
mongoose.connect('mongodb+srv://netik00:qtTk8lPR3ahTBtkE@clustor0.exbwhf8.mongodb.net/?retryWrites=true&w=majority&appName=Clustor0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
// Schema and Model
const todoSchema = new mongoose.Schema({
text: String,
completed: Boolean
});
const Todo = mongoose.model('Todo', todoSchema);
// Routes
app.get('/', async (req, res) => {
const todos = await Todo.find();
res.json(todos);
});
app.post('/', async (req, res) => {
const newTodo = new Todo({
text: req.body.text,
completed: false
});
await newTodo.save();
res.json(newTodo);
});
app.delete('/:id', async (req, res) => {
const result = await Todo.findByIdAndDelete(req.params.id);
res.json(result);
});
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});