require('dotenv').config();
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose');
const UserModel = require('../models/User.model');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iron-class';

mongoose
  .connect(MONGO_URI)
  .then((connectMongo) => {
    const databaseName = connectMongo.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .then(() => {
    const users = [
      {
        username: 'Pepe',
        email: 'pepe@gmail.com',
        password: 'Pepe1234'
      },
      {
        username: 'Luis',
        email: 'Luis@gmail.com',
        password: 'Luis1234'
      },
      {
        username: 'Mimo',
        email: 'Mimo@gmail.com',
        password: 'Mimo'
      },
      {
        username: 'Lolo',
        email: 'Lolo@gmail.com',
        password: 'Lolo1234'
      }
    ];
    return UserModel.insertMany(users);
  })
  .then((userCreated) => {
    console.log('Los usuarios creados son:', userCreated.length);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => {
        console.log('Disconnect');
      })
      .catch((err) => {
        console.error(err);
      });
  });
