const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: [{
    type: String,
    required: true,
    trim: true
  }]
},
{
  timestamps: true,
  versionKey: false
});

const BookModel = model('Book', bookSchema);

module.exports = BookModel;