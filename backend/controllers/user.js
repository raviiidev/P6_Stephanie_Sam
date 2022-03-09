// import du package de cryptage bcrypt
const bcrypt = require('bcrypt')

// import de jsonwebtoken : permet de créer et vérifier des tokens
const jwt = require('jsonwebtoken');

// import du modèle User
const User = require('../models/user')

// middleware avec fonction signup
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //nb de fois
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save() //enregistre l'utilisateur dans la BDD
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// middleware avec fonction login (connexion)
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // trouve l'utilisateur dans la BDD
    .then((user) => { // vérifie si trouve un user ou non
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      //compare le mdp avec le hash enregistré dans le user
      bcrypt 
        .compare(req.body.password, user.password)
        .then((valid) => { //boolean
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, //le mm utilisateur
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' })
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error })) //pb connexion
}
