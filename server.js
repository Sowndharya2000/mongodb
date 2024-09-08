const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 5000

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.post('/post',async (req,res)=>{
    const{regd_no,name,email,branch} = req.body
const user = new  Users({
    regd_no,
    name,
    email,
    branch
})
await user.save()
console.log(user)
res.send("Form Submission Successfully")
})
mongoose.connect('mongodb://localhost:27017/Node')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successfully")
})



const userSchema = new mongoose.Schema({
  regd_no:String,
  name:String,
  email:String,
  branch:String
})
const Users = mongoose.model('Post',userSchema)

app.listen(port,()=>{
    console.log("server started");
})