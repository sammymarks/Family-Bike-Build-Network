const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const bikes = await Bike.find()
        res.status(201).send(bikes)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const bike = await Bike.findById(req.params.id)
        res.status(201).send(bike)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}