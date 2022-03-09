// importation de mongoose
const mongoose = require('mongoose')

// schéma de données avec la fonction Schema de mongoose qui requiert un objet
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true }, //nb entre 1 et 10 décrivant la sauce
  //gestion des likes et dislikes
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
})

// export du modèle terminé : nom + schema
module.exports = mongoose.model('Sauce', sauceSchema)
