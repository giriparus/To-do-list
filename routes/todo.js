const User = require('../models/User');
const Todo = require('../models/todo.js');
const express=require('express')

const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
  const userId = req.session.userId;
  console.log('User ID:', userId);

  Todo.find({ user: userId })
    .then((todos) => {
      res.render('todos', { todos, successMessage: req.flash('successMessage') });
    })
    .catch((error) => {
      console.error('Error fetching todos:', error);
      res.render('todos', { errorMessage: 'Error fetching todos' });
    });
});

  router.post('/add', async (req, res) => {
    try {
      const userId = req.session.userId;

      const { title, description } = req.body;
  
      // Create a new TO-DO item in the database
      const newTodo = new Todo({
        title,
        description,
        user: userId
      });
      await newTodo.save();
      Todo.find({ user: userId })
      .then((todos) => {
      res.render('todos', { todos, successMessage: req.flash('successMessage') });
  })
    //  res.status(201).json({ message: 'TO-DO item created' });
    } catch (error) {
      console.error('Error creating TO-DO item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  


  router.get('/:id/delete', async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
  
      if (!deletedTodo) {
        return res.status(404).json({ message: 'TO-DO item not found' });
      }
      const userId = req.session.userId;

    Todo.find({ user: userId })
    .then((todos) => {
    res.render('todos', { todos, successMessage: req.flash('successMessage') })
     // res.status(200).json({ message: 'TO-DO item deleted' });
    })
    }
    catch (error) {
      console.error('Error deleting TO-DO item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

