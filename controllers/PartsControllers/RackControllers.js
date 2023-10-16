const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const racks = await Rack.find()
        res.status(201).send(racks)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const rack = await Rack.findById(req.params.id)
        res.status(201).send(rack)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}