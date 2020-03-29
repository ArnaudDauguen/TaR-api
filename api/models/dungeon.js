const mongoose = require("./db.js")

// Create a schema
//(name, varaibles, table)
const Dungeons = mongoose.model("Dungeons", {
    id: Number,
    name: String,
    creatorId: Number,
    isResolved: Boolean,
    isPublished: Boolean,
    timeFailed: Number,
    size: Number,
    difficulty: Number,
    paths: Array,
    stuff: Array,
    cases: Array,
}, "Dungeons")

  
module.exports = {
    get: async (dungeonId) => {
        return await Dungeons.findOne({id: dungeonId})
    },

    getAll: async (limit, offset) => {
        return await Dungeons.find().skip(offset).limit(limit).exec();
    },

    getAllWithout_id: async (limit, offset) => {
        return await Dungeons.find({},{"_id": 0}).skip(offset).limit(limit).exec();
    },

    getByUserId: async (userId) => {
        return await Dungeons.find({creatorId: userId})
    },

    insert: async (params) => {
        const lastId = await Dungeons.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1); // recup le plus grand id, +1
        params.id = !lastId ? 1 : lastId.id +1
        return Dungeons.create(params);
    },

    update: (dungeonId, params) => {
        //possibleKeys = ['name', 'isResolved', 'isPublished', 'timeFailed', 'paths'];
        const toUpdate = {};

        if(params.name) toUpdate.name = params.name;
        if(params.isResolved) toUpdate.isResolved = params.isResolved;
        if(params.isPublished) toUpdate.isPublished = params.isPublished;
        if(params.timeFailed) toUpdate.timeFailed = params.timeFailed;
        if(params.paths) toUpdate.paths = params.paths;

        return Dungeons.findOneAndUpdate({id: dungeonId}, toUpdate);
    },

    remove: (dungeonId) => {
        return Dungeons.findOneAndRemove({id: dungeonId});
    },

    count: () => {
      return Dungeons.count();
    },

    
}