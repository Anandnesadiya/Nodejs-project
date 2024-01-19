const express = require('express')
const fs = require('fs');
const userRouter = require('./routes/userRoutes')
path = require('path')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let userData = JSON.parse(fs.readFileSync('./userData.json'));

app.use("/users",userRouter);

// post start

app.post("/userData",(req,res)=>{
  let body = req.body;
  const newId = Number(userData[userData.length-1].id) +1;

  const newuserData = Object.assign(req.body,{id: newId})

  userData.push(newuserData);

  fs.writeFile('./userData.json',JSON.stringify(userData),(err)=>{
    if(err){
      return res.status(400).json({message:"invalid request"})
    }
    res.status(201).json({
      status:"success",
      data:{
        userData:newuserData
      }
    })
  });
  // res.send("created");
})

// post end

// put start

app.patch('/userData/:id',(req,res)=>{
  let body = req.body;
  let id = req.params.id;
  let userDataToUpdate = userData.find(el => el.id == id);
  let index = userData.indexOf(userDataToUpdate);

  Object.assign(userDataToUpdate,body);

  userData[index] = userDataToUpdate;

  fs.writeFile('./userData.json',JSON.stringify(userData),(err)=>{
    res.status(200).json({
      status:"success",
      data:{
        userData : userDataToUpdate
      }
    })
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