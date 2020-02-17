//jshint esversion:8
const router = require("express").Router();
const User = require("../model/User");
const { Bcrypt } = require("bcrypt-rust-wasm");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = Bcrypt.new(parseInt(process.env.SALT_ROUNDS));
//REGISTRATION ROUTE
router.post("/register", async (req, res) => {
  //VALIDATE
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //CHECK FOR EXISTING email
  const emailExists = await User.findOne({
    email: req.body.email
  });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  //HASH PASSWORDS

  const hash = bcrypt.hashSync(req.body.password);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });
  user
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({
        message: err
      });
    });
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  //VALIDATE
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //CHECK FOR EXISTING EMAIL
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return res.status(404).send("Email doesnt exist");
  }
  //PASSWORD IS CORRECT
  const validPass = bcrypt.verifySync(req.body.password, user.password);
  if (!validPass) {
    return res.status(401).send("Password is wrong");
  }

  //Create a Token
  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).json({"Auth Token":token});
});
module.exports = router;
