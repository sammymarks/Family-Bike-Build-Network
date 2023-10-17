const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

module.exports = {
    getAll,
    getByID,
    putAddToBuildCart
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

//app.put("/users/add-to-build-cart/:userID/:collectionURL/:partID", userController.putAddToBuildCart)
async function putAddToBuildCart  (req,res) {
    try {
        const user = await User.findById(req.params.userID)
        console.log("User",user)
        let partID = req.params.partID
        console.log("PartID", partID)
        let currentBikeCart = user.buildCartBikes
        console.log("Current Bike Array", currentBikeCart)
        // let futureBikeCart = [partID,...currentBikeCart]
        // console.log("new array", futureBikeCart)
        let updatedUser = await User.findByIdAndUpdate(user._id, { buildCartBikes : "[652efa8067f98fa85291fabd]" })
        console.log(updatedUser)
        
        





        // switch(collection){
        //     case "bikes": {
        //         newBuildCartArray = user.buildCartBikes.push(partID)
        //         console.log(newBuildCartArray)
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartBikes : newBuildCartArray })
        //     } break;
        //     case "racks": {
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartRacks : `[${user.buildCartRacks.push(partID)}]`})
        //     } break;
        //     case "seats": {
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartSeats : `[${user.buildCartSeats.push(partID)}]`})
        //     } break;
        //     case "storages": {
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartStorages : `[${user.buildCartStorages.push(partID)}]`})
        //     } break;
        //     case "trailers": {
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartTrailers : `[${user.buildCartTrailers.push(partID)}]`})
        //     } break;
        //     case "accessories": {
        //         await User.findByIdAndUpdate(req.params.userID, { buildCartAccessories : `[${user.buildCartAccessories.push(partID)}]`})
        //     } break;
        // }

        res.status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}


// const part = await Bike.findById(req.params.partID)

// let currentLikes = part.likedByUsers
// let futureLikes = [req.params.userID,...currentLikes]

// let updatedPart = await Bike.findByIdAndUpdate(part._id, { likedByUsers: futureLikes } )
// console.log(updatedPart)


// res.status(201)
// } catch (e) {
// return res.status(500).json({ error: e.message })
// }