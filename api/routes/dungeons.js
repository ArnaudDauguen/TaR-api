const router = require('express').Router()
const Dungeon = require('../models/dungeon')


// get All
router.get('/', function(req, res, next) {
  if(!req.query.limit || isNaN(req.query.limit)) req.query.limit = 10
  if(!req.query.offset || isNaN(req.query.offset)) req.query.offset = 0
  Dungeon.getAll(parseInt(req.query.limit), parseInt(req.query.offset))
  .then((dungeons) => {
    res.status(200).json(dungeons);
  })
  .catch((err) => {
      console.log(err)
    return next(err)
  })
})

// get one
router.get('/:dungeonId', function(req, res, next){
  if(isNaN(req.params.dungeonId)) return next()
  Dungeon.get(req.params.dungeonId)
  .then((dungeon) => {
    if(!dungeon) return next()
    res.status(200).json(dungeon)
  })
  .catch((err) =>{
    return next(err)
  })
})

// create
router.post('/', function(req, res, next) {
  if(!req.body.email || !req.body.password || !req.body.pseudo) return next(new Error('Bad request'))
  req.body.exp = req.body.exp || 0
  Dungeon.insert(req.body)
  .then((dungeonCreated) => {
    if(!dungeonCreated) return next()
    res.status(201).json(dungeonCreated)
  })
  .catch((err) => {
    return next(err)
  })
})

// update
router.patch('/:dungeonId', function(req, res, next) {
  if(isNaN(req.params.dungeonId)) return next()
  Dungeon.update(req.params.dungeonId, req.body)
  .then((dungeon) =>{
    res.status(204).json(dungeon)
  })
  .catch((err) => {
    return next(err)
  })
})

// delete
router.delete('/:dungeonId', function(req, res, next) {
  if(isNaN(req.params.dungeonId)) return next()
  Dungeon.remove(req.params.dungeonId)
  .then((dungeon) => {
    res.status(204)
  })
  .catch((err) => {
    return next(err)
  })
})



module.exports = router
