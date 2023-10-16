const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const builds = await Build.find()
        res.status(201).send(builds)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const build = await Build.findById(req.params.id)
        res.status(201).send(build)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}