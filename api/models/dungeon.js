const mongoose = require('mongoose')
const env = process.env
const mongooseDungeon = mongoose.createConnection('mongodb://' + (env.MONGO_HOST || 'localhost') + ':' + (env.MONGO_PORT || 27017) +'/Dungeons')

// Create a schema
const DungeonSchema = new mongoose.Schema({
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
  })
  
// Create a model based on the schema
const Dungeons = mongooseDungeon.model('Dungeons', DungeonSchema);

  
module.exports = {
    get: (dungeonId) => {
        return Dungeons.findOne({id: dungeonId})
    },

    getAll: (limit, offset) => {
        return Dungeons.find().skip(offset).limit(limit);
    },

    getByUserId: (userId) => {
        return Dungeons.find({creatorId: userId})
    },

    insert: async (params) => {
        params.id = await Dungeons.findOne({},{id: 1, _id: 0}).sort({id:-1}).limit(1) +1; // recup le plus grand id, +1
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