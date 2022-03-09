// importation de mongoose 
const mongoose = require ("mongoose")

// import du validateur unique
const uniqueValidator = require('mongoose-unique-validator');

// le modèle de base de données pour le signup
const userSchema = mongoose.Schema ({
    email : {type : String, required : true , unique : true},
    password : {type : String, required : true}
})

//2 utilisateurs ne puissent partager la mm adresse mail 
userSchema.plugin(uniqueValidator);

//exportation du module 
module.exports = mongoose.model("user", userSchema)