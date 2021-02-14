const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {
  registerValidation,
  loginValidation
} = require('../validation');



//Registrierung

router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Exestiert der Username schon?
  const usernameExist = await User.findOne({
    username: req.body.username
  });
  if (usernameExist) return res.status(400).send('Username wird schon verwendet');

  //Passwort Schutz
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // Neuer User wird hinzugefügt
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({
      user: user.id
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login

router.post('/login', async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Suche Datenbank nach Usernamen
  const user = await User.findOne({
    username: req.body.username
  });
  if (!user) return res.status(400).send('Username oder Passwort is falsch');

  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) return res.status(400).send('Username oder Passwort is falsch');

  // JWT

  const token = jwt.sign({_id: user._id},process.env.SECRET_TOKEN);

  // res.header('auth-token', token).send(token);
  
  res.json({
    token,
    username: req.body.username
  });

});

module.exports = router;