const User = require('../models/User');
const Todo = require('../models/todo.js');
const express = require('express');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const router=express.Router()

module.exports=router

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
    try {
      const { username, password, email } = req.body;
      
      const existingUser = await User.findOne().or([{ username }, { email }]);
      if (existingUser) {
        return res.status(409).json({ message: 'Username or email already exists' });
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username,
        password: hashedPassword,
        email
      });
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



router.post('/login', async (req, res) => {
    try {
      
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    req.session.userId = user._id;

    const userId = req.session.userId;
    console.log(userId)

    Todo.find({ user: userId })
    .then((todos) => {
    res.render('todos', { todos, successMessage: req.flash('successMessage') });
  })
      
     // res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
  });




















// function isAuthenticated(req, res, next) {
//     if (req.session.userId) {
//       // User is authenticated, proceed to the next middleware or route handler
//       next();
//     } else {
//       // User is not authenticated, redirect to the login page or show an error
//       res.redirect('/login');
//     }
//   }
  
//   // Usage example
// app.get('/todos', isAuthenticated, (req, res) => {
//     // Handle the authenticated user's TO-DO list
//   });
  


