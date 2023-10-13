const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}