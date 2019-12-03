const mongoose = require('mongoose')
const env = process.env
mongoose.connect('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Users')

// Create a schema
const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    pseudo: String,
    password: String,
    exp: Number,
  })
  
// Create a model based on the schema
const Users = mongoose.model('Users', UserSchema);

  
module.exports = {
    insert: async (params) => {
        params.id = await Users.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Users.create(params);
    },

    get: (userId) => {
        return Users.findOne({id: userId})
    },

    update: (userId, params) => {
        //possibleKeys = ['email', 'pseudo', 'password', 'exp'];
        const toUpdate = {};

        if(params.email) toUpdate.email = params.email;
        if(params.pseudo) toUpdate.pseudo = params.pseudo;
        if(params.password) toUpdate.password = params.password;
        if(params.exp) toUpdate.exp = params.exp;

        return Users.findOneAndUpdate({id: userId}, toUpdate);
    },

    remove: (userId) => {
        return Users.remove({id: userId});
    },

    count: () => {
      return Users.count();
    },

    getAll: (limit, offset) => {
        return Users.find().skip(offset).limit(limit);
    },

    
}