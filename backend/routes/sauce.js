// import d'express
const express = require('express')
// création d'un router
const router = express.Router()

// import middleware d'authentification
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// import des controllers
const sauceCtrl = require('../controllers/sauces')
const likeCtrl = require('../controllers/likes')

//enregistrer les routes dans le router et
//application des fonctions du controller
// auth applique authentification à toutes les routes
// multer applique l'ajout de fichier aux routes post et put, doit être placé après auth !
router.post('/', auth, multer, sauceCtrl.createSauce)
/* les : en face du segment dynamique de la route
permettent de la rendre accessible en t q paramètre */
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauces)
router.post('/:id/like', auth, likeCtrl.likeSauce)

// export du router
module.exports = router
