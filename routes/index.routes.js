const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.model');

/* GET home page */

router.get('/', (req, res) => {

  console.log(req.user);
  res.render('searchUser');
});

/**
 * Req.query
 * url: http://localhost:3000/users?email=gmail&limit=2
 *
 * req.query = {email: gmail, limit: 2};
 */

router.get('/users', (req, res, next) => {
  const { email, limit } = req.query;

  const newRegx = new RegExp(email, 'i');
  UserModel.find({ email: newRegx })
    .select('username')
    .limit(+limit)
    .then((users) => {
      /**
       * const objUser = { users: users };
       * res.render('user', objUser);
       */
      // console.log(users);
      res.render('users', { users });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/user/create', (req, res) => {
  res.render('createUser');
})

/**
 * Req.params
 * url: http://localhost:3000/user/LOQUESEA
 *
 * ruta --> '/user/:id'
 *
 * la :id es la key de nuestro obj de params.
 *
 * req.params = { id: LOQUESEA }
 *
 */

router.get('/user/:id', (req, res, next) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((user) => {
      res.render('user', user);
    })
    .catch((err) => next(err));
});


router.post('/user', (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new UserModel({ username, email, password });

  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.render('user', user);
    })
    .catch((err) => next(err));
});

module.exports = router;
