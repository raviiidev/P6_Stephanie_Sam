//import de jsonwebtoken (verifie token)
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // récupère le token dans le header authorization
    // split retourne un tableau avec bearer en 0 et le token en 1 
    const token = req.headers.authorization.split(' ')[1];
    // décoder le token avec verify (token, clé secrète qui sera plus longue en prod)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // récupère le userId du token
    const userId = decodedToken.userId;
    // ajout de l'userId du token à l'objet requête
    req.auth = { userId };
    // vérifier que le userId de la requête correspond à celui du token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée!')
    });
  }
};