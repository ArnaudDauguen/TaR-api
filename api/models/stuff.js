const mongoose = require('mongoose')
const env = process.env
const mongooseStuff = mongoose.createConnection('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Stuffs')

// Create a schema
const StuffSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    type: String,
    attack: Number,
    armor: Number,
  })
  
// Create a model based on the schema
const Stuff = mongooseStuff.model('Stuff', StuffSchema);

  
module.exports = {
    get: (stuffId) => {
        return Stuff.findOne({id: stuffId})
    },

    getAll: (limit, offset) => {
        return Stuff.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        params.id = await Stuff.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Stuff.create(params);
    },

    update: (stuffId, params) => {
        //possibleKeys = ['name', 'price', 'type', 'attack', 'armor'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.price) toUpdate.price = params.price;
        if(params.type) toUpdate.type = params.type;
        if(params.attack) toUpdate.attack = params.attack;
        if(params.armor) toUpdate.armor = params.armor;

        return Stuff.findOneAndUpdate({id: stuffId}, toUpdate);
    },

    remove: (stuffId) => {
        return Stuff.findOneAndRemove({id: stuffId});
    },

    count: () => {
      return Stuff.count();
    },

    
}