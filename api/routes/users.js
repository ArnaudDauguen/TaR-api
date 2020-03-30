const router = require('express').Router()
const User = require('../models/user')
const Dungeon = require('../models/dungeon')


// get All
router.get('/', function(req, res, next) {
  if(!req.query.limit || isNaN(req.query.limit)) req.query.limit = 10
  if(!req.query.offset || isNaN(req.query.offset)) req.query.offset = 0
  User.getAll(parseInt(req.query.limit), parseInt(req.query.offset))
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    return next(err)
  })
})

// get one
router.get('/:userId', function(req, res, next){
  if(isNaN(req.params.userId)) return next()
  User.get(req.params.userId)
  .then((user) => {
    if(!user) return next()
    res.status(200).json(user)
  })
  .catch((err) =>{
    return next(err)
  })
})

// get dungeons
router.get('/:userId/dungeons', function(req, res, next){
  if(isNaN(req.params.userId)) return next()
  Dungeon.getByUserId(req.params.userId)
  .then((dungeons) => {
    if(!dungeons) return next()
    res.status(200).json(dungeons)
  })
  .catch((err) => {
    return next(err)
  })
})

// create
router.post('/', function(req, res, next) {
  if(!req.query.email || !req.query.password || !req.query.pseudo) return next({message: 'Bad request', status: 400})
  req.query.exp = req.query.exp || 0
  User.insert(req.query)
  .then((userCreated) => {
    if(!userCreated) return next()
    res.status(201).json(userCreated)
  })
  .catch((err) => {
    return next(err)
  })
})

// update
router.patch('/:userId', function(req, res, next) {
  if(isNaN(req.params.userId)) return next()
  User.update(req.params.userId, req.query)
  .then((user) =>{
    res.status(200).json(user)
  })
  .catch((err) => {
    return next(err)
  })
})

// delete
router.delete('/:userId', function(req, res, next) {
  if(isNaN(req.params.userId)) return next()
  User.remove(req.params.userId)
  .then((user) => {
    res.status(200).json({deleted: user || 'no user'})
  })
  .catch((err) => {
    return next(err)
  })
})



module.exports = router
