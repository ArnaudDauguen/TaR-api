const mongoose = require('mongoose')
const env = process.env
mongoose.connect('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Terrains')

// Create a schema
const TerrainSchema = new mongoose.Schema({
    id: Number,
    name: String,
    effect: Array,
  })
  
// Create a model based on the schema
const Terrains = mongoose.model('Terrains', TerrainSchema);

  
module.exports = {
    insert: async (params) => {
        params.id = await Terrains.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Terrains.create(params);
    },

    get: (terrainId) => {
        return Terrains.findOne({id: terrainId})
    },

    update: (terrainId, params) => {
        //possibleKeys = ['name', 'effect'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.effect) toUpdate.effect = params.effect;

        return Terrains.findOneAndUpdate({id: terrainId}, toUpdate);
    },

    remove: (terrainId) => {
        return Terrains.remove({id: terrainId});
    },

    count: () => {
      return Terrains.count();
    },

    getAll: (limit, offset) => {
        return Terrains.find().skip(offset).limit(limit);
    },

    
}