const express = require('express')
const userRouter = require('./routes/userRoutes')
path = require('path')
const app = express()
const port = 3000;
const userData = require("./userData.json")
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/users",userRouter);

// post start

app.post("/userData",(req,res)=>{
  console.log(req.body);
  res.send(req.body);
})

// post end

// put start

app.put("/userData",(req,res)=>{
  console.log(req.body)
  return res.json({
    message:"put route"
  })
})

// put end

// delet start

app.delete("/userData",(req,res)=>{
  console.log(res.paraams);
  return res.json({
    message:"delete route",
  })
})

// delete end

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/userData', (req, res) => {
  res.status(200).json(userData);
})

app.get("/random",(req,res)=>{
  let index = Math.floor(Math.random() * userData.length)
  let a = userData[index];
  res.status(200).json(a);
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})