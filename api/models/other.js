const mongoose = require("./db.js")

// Create a schema
const Others = mongoose.model("Others", {
    id: Number,
    name: String,
    effect: Array,
}, "Others")

  
module.exports = {
    get: (otherId) => {
        return Others.findOne({id: otherId})
    },

    getAll: async (limit, offset) => {
        return await Others.find().skip(offset).limit(limit);
    },

    insert: async (params) => {
        const lastId = await Others.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
        params.id = lastId.id +1
        return Others.create(params);
    },

    update: (otherId, params) => {
        //TODO update other
        //possibleKeys = ['name', 'effect'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.effect) toUpdate.effect = params.effect;

        return Others.findOneAndUpdate({id: otherId}, toUpdate);
    },

    remove: (otherId) => {
        return Others.findOneAndRemove({id: otherId});
    },

    count: () => {
      return Others.count();
    },

    
}