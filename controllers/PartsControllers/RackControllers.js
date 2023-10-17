const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID,
    putAddUserLike,
    putRemoveUserLike
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


// http://localhost:3001/:partCollectionURL/add-user-like/:partID/:userID

async function putAddUserLike (req, res) {
    try {
        console.log(req.params.partID)
        console.log(req.params.userID)
        
        const part = await Rack.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let futureLikes = [req.params.userID,...currentLikes]

        let updatedPart = await Rack.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 

// http://localhost:3001/:partCollectionURL/remove-user-like/:partID/:userID

async function putRemoveUserLike (req, res) {
    try {
        const part = await Rack.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let userIndex = currentLikes.indexOf(req.params.userID)
        currentLikes.splice(userIndex,1)

        let futureLikes = currentLikes

        let updatedPart = await Rack.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 