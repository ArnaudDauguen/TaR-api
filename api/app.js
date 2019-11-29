// Dépendances 3rd party
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const PORT = process.PORT || 8080
const app = express()


// Middleware pour forcer un verbe HTTP
app.use(methodOverride('_method', {
    methods: ['GET', 'POST']
}))


// Middleware pour parser le body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routeurs
app.use('/users', require('./routes/users'))
app.use('/dungeons', require('./routes/dungeons'))
// Erreur 404
app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

  
// Gestion des erreurs
app.use(function(err, req, res, next) {
    let data = {
        message: err.message,
        status: err.status || 500
    }

    res.status(data.status)
    res.send(data)
})
  

app.listen(PORT, () => {
console.log('> Serveur démarré sur le port : ', PORT)
});
  