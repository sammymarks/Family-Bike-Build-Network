const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const seats = await Seat.find()
        res.status(201).send(seats)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const seat = await Seat.findById(req.params.id)
        res.status(201).send(seat)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}