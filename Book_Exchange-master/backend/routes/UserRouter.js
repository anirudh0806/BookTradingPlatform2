const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const fetchTemplateCopy = require('../models/fetchmodels')

router.post("/register" , async (req,res) => {
  try{
  const {email,password,passwordCheck,username} = req.body;

  if(!email || !password|| !passwordCheck|| !username)
    return res.status(400).json({msg: "All fields are required"});
  if(password.length < 6)
    return res.status(400).json({msg: "Password should be atleast six characters"});
  if(password !== passwordCheck)
    return res.status(400).json({msg: "Password do not match"});

  const existingUser = await User.findOne({email : email})
  if(existingUser)
    return res.status(400).json({msg: "User already exists"});

  const salt = await bcrypt.genSalt();
  const encpassword = await bcrypt.hash(password,salt);

  const newUser = new User({
    email,
    password: encpassword, 
    username,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
  }

  catch(err){
  res.status(500).json({error: err.message});
  }
});
router.post("/login" , async (req,res) => {
try{
  const {email,password} = req.body;
  if(!email || !password)
    return res.status(400).json({msg: "All fields are required"});
  if(password.length < 6)
    return res.status(400).json({msg: "Password should be atleast six characters"});

  const user = await User.findOne({email : email});

  if(!user)
    return res.status(400).json({msg: "Invalid Email"});
  const check = await bcrypt.compare(password,user.password);
  if(!check)
    return res.status(400).json({msg: "Incorrect Password"});
  res.json({
    user:{
      username: user.username,
      password: user.password,
      email: user.email
    },
  });
}
catch(err){
res.status(500).json({error: err.message});
}
});
router.post('/profile', async(request, response) =>{
    const fetchedUser = new fetchTemplateCopy({
        bookName:request.body.bookName,
        author:request.body.username,
        email:request.body.email,
        phoneno:request.body.phoneno
    })
    fetchedUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

router.get('/search', async(req,res) =>{

  const a = await (fetchTemplateCopy.find())
  res.send(a)
  });

router.post('/delete', async(req,res) =>{
    id = req.body.id;
    await fetchTemplateCopy.deleteOne({_id: id})
    res.send("deleted")
  });
module.exports = router;
