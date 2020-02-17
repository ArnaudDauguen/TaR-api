const mongoose = require('mongoose')
const env = process.env
mongoose.connect('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/TaR')

module.exports = mongoose