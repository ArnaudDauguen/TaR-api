const router = require('express').Router()
const Dungeon = require('../models/dungeon')


// get All
router.get('/', function(req, res, next) {
  console.log(1)
  if(!req.query.limit || isNaN(req.query.limit)) req.query.limit = 10
  if(!req.query.offset || isNaN(req.query.offset)) req.query.offset = 0
  console.log(req.query)
  Dungeon.getAll(parseInt(req.query.limit), parseInt(req.query.offset))
  .then((dungeons) => {
    console.log(3)
    res.status(200).json(dungeons);
  })
  .catch((err) => {
    console.log(4)
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
  if(!req.query.email || !req.query.password || !req.query.pseudo) return next(new Error('Bad request'))
  req.query.exp = req.query.exp || 0
  Dungeon.insert(req.query)
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
  Dungeon.update(req.params.dungeonId, req.query)
  .then((dungeon) =>{
    res.status(200).json(dungeon)
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
    res.status(200).json({deleted: dungeon || 'no dungeon'})
  })
  .catch((err) => {
    return next(err)
  })
})



module.exports = router
