const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const trailers = await Trailer.find()
        res.status(201).send(trailers)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const trailer = await Trailer.findById(req.params.id)
        res.status(201).send(trailer)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}