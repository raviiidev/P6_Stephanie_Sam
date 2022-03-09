// importation du package http
const http = require('http')
// importation de l'application
const app = require('./app')

//renvoi un port valide sous forme de chaine
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
// Indiquer à l'app express sur quel port elle doit tourner
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// gestion des erreurs de port
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

// création du server avec methode creteServer qui reçoit la fonction app
const server = http.createServer(app)

// appel de la fonction de gestion d'erreur
server.on('error', errorHandler)

// écoute du port d'exécution du serveur
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

// Ecoute des requêtes envoyées par le port disponible
server.listen(port)
