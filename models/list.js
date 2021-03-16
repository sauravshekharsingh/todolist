const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

const List = mongoose.model('List', todoListSchema);

module.exports = List;