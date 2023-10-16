const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const accessories = await Accessory.find()
        res.status(201).send(accessories)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const accessory = await Accessory.findById(req.params.id)
        res.status(201).send(accessory)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}