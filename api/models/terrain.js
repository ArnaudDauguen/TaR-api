const mongoose = require('mongoose')
const env = process.env
const mongooseTerrain = mongoose.createConnection('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Terrains')

// Create a schema
const TerrainSchema = new mongoose.Schema({
    id: Number,
    name: String,
    effect: Array,
  })
  
// Create a model based on the schema
const Terrains = mongooseTerrain.model('Terrains', TerrainSchema);

  
module.exports = {
    get: (terrainId) => {
        return Terrains.findOne({id: terrainId})
    },

    getAll: (limit, offset) => {
        return Terrains.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        params.id = await Terrains.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Terrains.create(params);
    },

    update: (terrainId, params) => {
        //possibleKeys = ['name', 'effect'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.effect) toUpdate.effect = params.effect;

        return Terrains.findOneAndUpdate({id: terrainId}, toUpdate);
    },

    remove: (terrainId) => {
        return Terrains.findOneAndRemove({id: terrainId});
    },

    count: () => {
      return Terrains.count();
    },

    
}