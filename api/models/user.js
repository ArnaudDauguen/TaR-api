const mongoose = require("./db.js")

// Create a schema
const Users = mongoose.model("Users", {
    id: Number,
    email: String,
    pseudo: String,
    password: String,
    exp: Number,
}, "Users")

  
module.exports = {
    get: (userId) => {
        return Users.findOne({id: userId})
    },

    getAll: (limit, offset) => {
        return Users.find().skip(offset).limit(limit);
    },
    
    insert: async (params) => {
        await Users.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1)
        .then((id) => {params.id = id.id +1}) // recup le plus grand id, +1
        return Users.create(params)
        .then((createdUser) => {
            return createdUser
        })
    },
    
    update: (userId, params) => {
        //possibleKeys = ['email', 'pseudo', 'password', 'exp'];
        const toUpdate = {};

        if(params.email) toUpdate.email = params.email;
        if(params.pseudo) toUpdate.pseudo = params.pseudo;
        if(params.password) toUpdate.password = params.password;
        if(params.exp) toUpdate.exp = params.exp;

        return Users.findOneAndUpdate({id: userId}, toUpdate)
        .then((user) => {
            return user
        })
    },

    remove: (userId) => {
        return Users.findOneAndRemove({id: userId});
    },

    count: () => {
      return Users.count();
    }
    
}