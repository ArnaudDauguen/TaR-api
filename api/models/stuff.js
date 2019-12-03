const mongoose = require('mongoose')
const env = process.env
mongoose.connect('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Stuff')

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
const Stuff = mongoose.model('Stuff', StuffSchema);

  
module.exports = {
    insert: async (params) => {
        params.id = await Stuff.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Stuff.create(params);
    },

    get: (stuffId) => {
        return Stuff.findOne({id: stuffId})
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
        return Stuff.remove({id: stuffId});
    },

    count: () => {
      return Stuff.count();
    },

    getAll: (limit, offset) => {
        return Stuff.find().skip(offset).limit(limit);
    },

    
}