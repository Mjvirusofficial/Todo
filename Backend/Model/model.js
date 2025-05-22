const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    data:{
        type: String,
        required: true,
    }
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo;

