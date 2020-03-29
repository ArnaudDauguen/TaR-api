const router = require('express').Router()
const Stuff = require('../models/stuff')
const Terrain = require('../models/terrain')
const Monster = require('../models/monster')
const Other = require('../models/other')


// get All ids
router.get('/ids', function (req, res, next) {
    Promise.all([
        Stuff.getAll(),
        Terrain.getAll(),
        Monster.getAll(),
        Other.getAll(),
    ])
    .then((ressources) => {
        const datas = {
            stuffs: ressources[0].map(x => x._doc.id),
            terrains: ressources[1].map(x => x._doc.id),
            monsters: ressources[2].map(x => x._doc.id),
            others: ressources[3].map(x => x._doc.id),
        }
        res.status(200).json(datas)
    })
    .catch((err) => {
        console.log(err)
        return next(err)
    })
})


// get All
router.get('/', function (req, res, next) {
    Promise.all([
        Stuff.getAllWithout_id(),
        Terrain.getAllWithout_id(),
        Monster.getAllWithout_id(),
        Other.getAllWithout_id(),
    ]).then((ressources) => {
        const datas = {
            stuffs: ressources[0],
            terrains: ressources[1],
            monsters: ressources[2],
            others: ressources[3].map(x => x._doc.id),
        }
        res.status(200).json(datas)
    })
        .catch((err) => {
            return next(err)
        })
})



module.exports = router