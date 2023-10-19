const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID,
    putAddUserLike,
    putRemoveUserLike
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

// http://localhost:3001/:partCollectionURL/add-user-like/:partID/:userID

async function putAddUserLike (req, res) {
    try {
        console.log(req.params.partID)
        console.log(req.params.userID)
        
        const part = await Trailer.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let futureLikes = [req.params.userID,...currentLikes]

        let updatedPart = await Trailer.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.send(updatedPart).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 

// http://localhost:3001/:partCollectionURL/remove-user-like/:partID/:userID

async function putRemoveUserLike (req, res) {
    try {
        const part = await Trailer.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let userIndex = currentLikes.indexOf(req.params.userID)
        currentLikes.splice(userIndex,1)

        let futureLikes = currentLikes

        let updatedPart = await Trailer.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.send(updatedPart).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 