const http=require('http')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const express = require('express')
const flash = require('connect-flash');


const app=express()
app.use(express.json())
app.listen(8080, ()=>{
  console.log('Listening...')
})

app.set('view engine', 'hbs')

mongoose.connect('mongodb://mongo:27017/todolist')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'DeCurtis',
    resave: false,
    saveUninitialized: false
  }));

app.use(flash());
app.use(express.static('public'))
app.use('/', authRoutes)
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

module.exports=app


