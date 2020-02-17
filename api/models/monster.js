const mongoose = require("./db.js")

// Create a schema
const Monsters = mongoose.model("Monsters", {
    id: Number,
    name: String,
    hp: Number,
}, "Monsters")

  
module.exports = {
    get: (monsterId) => {
        return Monsters.findOne({id: monsterId})
    },

    getAll: async (limit, offset) => {
        return await Monsters.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        params.id = await Monsters.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        return Monsters.create(params);
    },

    update: (monsterId, params) => {
        //possibleKeys = ['name', 'hp'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.hp) toUpdate.hp = params.hp;

        return Monsters.findOneAndUpdate({id: monsterId}, toUpdate);
    },

    remove: (monsterId) => {
        return Monsters.findOneAndRemove({id: monsterId});
    },

    count: () => {
      return Monsters.count();
    },

    
}