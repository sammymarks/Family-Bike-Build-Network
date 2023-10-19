const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require('../../models/index')

module.exports = {
    getAll,
    getByID,
    putAddUserLike,
    putRemoveUserLike,
    postPart
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

// http://localhost:3001/:partCollectionURL/add-user-like/:partID/:userID

async function putAddUserLike (req, res) {
    try {     
        const part = await Bike.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let futureLikes = [req.params.userID,...currentLikes]

        let updatedPart = await Bike.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.send(updatedPart).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 

// http://localhost:3001/:partCollectionURL/remove-user-like/:partID/:userID

async function putRemoveUserLike (req, res) {
    try {
        const part = await Bike.findById(req.params.partID)

        let currentLikes = part.likedByUsers
        let userIndex = currentLikes.indexOf(req.params.userID)
        currentLikes.splice(userIndex,1)

        let futureLikes = currentLikes

        let updatedPart = await Bike.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
        console.log(updatedPart)
        
        
        res.send(updatedPart).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 

async function postPart (req,res) {
    try {
        let newPart = await Bike.create(req.body)
        res.send(newPart).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}