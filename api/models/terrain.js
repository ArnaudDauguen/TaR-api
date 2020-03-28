const mongoose = require("./db.js")

// Create a schema
const Terrains = mongoose.model("Terrains", {
    id: Number,
    name: String,
    speed: Number,
    damage: Number,
}, "Terrains")

  
module.exports = {
    get: (terrainId) => {
        return Terrains.findOne({id: terrainId})
    },

    getAll: async (limit, offset) => {
        return await Terrains.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        const lastId = await Terrains.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        params.id = lastId.id +1
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