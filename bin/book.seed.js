require('dotenv').config(); // Para poder leer el archivo .env :D
const BookModel = require('../models/Book.model');
const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iron-class';

mongoose
  .connect(MONGO_URI)
  .then((connectMongo) => {
    const databaseName = connectMongo.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .then(() => {
    const books = [
      {
        author: 'pepe',
        title: 'El libro de Juan2',
        year: 902,
        genre: ['Action'],
      },
      {
        author: 'Danie Vazquez',
        title: 'El libre de Pepe2',
        year: 1995,
        genre: ['Drama'],
      },
    ];
    return BookModel.insertMany(books);
  })
  .then((books) => {
    console.log(books);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
