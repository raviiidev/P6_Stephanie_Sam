const dotenv = require('dotenv').config()

// importation d'express
const express = require('express')
const app = express()

//importation de body parser
const bodyParser = require('body-parser')

const cors = require('cors')
const path = require('path')

//importation de mongoose
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')
const sauce = require('./models/sauces')

//impotation mongoose pour me connecter à la base de données mongo DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cp7es.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

//Prévention des cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  )
  next()
})

// transforme le body en json objet js utilisable
app.use(bodyParser.json())
app.use(express.json())
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

// export de cette variable depuis le server Node notamment
module.exports = app
