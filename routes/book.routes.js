const router = require('express').Router();
const BookModel = require('../models/Book.model');

router.get('/', (req, res) => {
  BookModel.find()
    .then((books) => {
      // const obj = { books: books } // const obj = { books }
      res.render('book', { books });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
