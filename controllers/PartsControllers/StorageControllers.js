const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const storages = await Storage.find()
        res.status(201).send(storages)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const storage = await Storage.findById(req.params.id)
        res.status(201).send(storage)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}