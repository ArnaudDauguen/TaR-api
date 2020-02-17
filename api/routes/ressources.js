const router = require('express').Router()
const Stuff = require('../models/stuff')
const Terrain = require('../models/terrain')


// get All
router.get('/', function(req, res, next) {
  Promise.all([
    Stuff.getAll(),
    Terrain.getAll(),
  ]).then((ressources) => {
      console.log(ressources)
    const datas = {
      stuffs: ressources[0],
      terrains: ressources[1],
    }
      res.status(200).json(datas)
  })
  .catch((err) => {
      return next(err)
  })
})



module.exports = router