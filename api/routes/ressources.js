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
        console.log(ressources[0])
        console.log(ressources[1])
        console.log(ressources[2])
        console.log(ressources[3])
        const datas = {
            stuffs: ressources[0].map(x => x._doc.id),
            terrains: ressources[1].map(x => x._doc.id),
            monsters: ressources[2].map(x => x._doc.id),
            others: ressources[3].map(x => x._doc.id),
        }
        console.log(datas)
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
        Stuff.getAll(),
        Terrain.getAll(),
        Monster.getAll(),
        Other.getAll(),
    ]).then((ressources) => {
        const datas = {
            stuffs: ressources[0],
            terrains: ressources[1],
            monsters: ressources[2],
            others: ressources[3],
        }
        res.status(200).json(datas)
    })
        .catch((err) => {
            return next(err)
        })
})



module.exports = router