const mongoose = require("./db.js")

// Create a schema
const Stuffs = mongoose.model("Stuffs",{
    id: Number,
    name: String,
    price: Number,
    type: String,
    attack: Number,
    armor: Number,
    range: Number,
    difficulty: Number,
}, "Stuffs")

  
module.exports = {
    get: (stuffId) => {
        return Stuffs.findOne({id: stuffId})
    },

    getAll: (limit, offset) => {
        return Stuffs.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        const lastId = await Stuffs.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        params.id = lastId.id +1
        return Stuffs.create(params);
    },

    update: (stuffId, params) => {
        //possibleKeys = ['name', 'price', 'type', 'attack', 'armor'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.price) toUpdate.price = params.price;
        if(params.type) toUpdate.type = params.type;
        if(params.attack) toUpdate.attack = params.attack;
        if(params.armor) toUpdate.armor = params.armor;

        return Stuffs.findOneAndUpdate({id: stuffId}, toUpdate);
    },

    remove: (stuffId) => {
        return Stuffs.findOneAndRemove({id: stuffId});
    },

    count: () => {
      return Stuffs.count();
    },

    
}