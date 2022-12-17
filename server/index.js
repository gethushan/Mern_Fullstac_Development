const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/users')
const port = 3000
const cors = require('cors')
require('dotenv').config()


app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_CONNECTION_VARIABLE)

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err,result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

app.post('/createList', async (req, res) =>{
  const todolist = req.body;
  const newtodolist = new UserModel(todolist);
  await newtodolist.save(); 
  res.json(newtodolist);
})

app.delete('/delete/:id', async (req,res) =>{
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})