const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

module.exports = {
    getAll,
    getByID,
    postNewBuild,
    putAddUserLike,
    putRemoveUserLike
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

async function postNewBuild (req, res) {
    console.log(req.body)
    try {        
        const newBuild = await Build.create(req.body)
        res.status(201).send(newBuild)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

// app.put("/builds/add-user-like/:partID/:userID", buildController.putAddUserLike)

async function putAddUserLike (req, res) {
    try {     
        const build = await Build.findById(req.params.buildID)

        let currentLikes = build.likedByUsers
        let futureLikes = [req.params.userID,...currentLikes]

        let updatedBuild = await Build.findByIdAndUpdate(build._id, { likedByUsers: futureLikes } )
        console.log(updatedBuild)
        
        res.send(updatedBuild).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 

// app.put("/builds/remove-user-like/:partID/:userID", buildController.putRemoveUserLike)

async function putRemoveUserLike (req, res) {
    try {
        const build = await Build.findById(req.params.buildID)

        let currentLikes = build.likedByUsers
        let userIndex = currentLikes.indexOf(req.params.userID)
        currentLikes.splice(userIndex,1)

        let futureLikes = currentLikes

        let updatedBuild = await Build.findByIdAndUpdate(build._id, { likedByUsers: futureLikes } )
        console.log(updatedBuild)
        
        
        res.send(updatedBuild).status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
} 