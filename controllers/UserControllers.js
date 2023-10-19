const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

module.exports = {
    getAll,
    getByID,
    putRemoveFromBuildCart,
    putAddToBuildCart,
    putClearCarts
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

//app.put("/users/remove-from-build-cart/:userID/:collectionURL/:partID", userController.putRemoveFromBuildCart)
async function putRemoveFromBuildCart  (req,res) {
    try {
        const user = await User.findById(req.params.userID)
        console.log(user)
        let collection = req.params.collectionURL
        console.log(collection)

        switch(collection){
            case "bikes": {
                let currentBikeCart = user.buildCartBikes
                let removeIndex = currentBikeCart.indexOf(req.params.partID)
                let removedPart = currentBikeCart.splice(removeIndex,1)
                console.log(`removed part:`, removedPart)
                console.log(`bike cart`, currentBikeCart)
                // let futureBikeCart = currentBikeCart
                await User.findByIdAndUpdate(user._id, { buildCartBikes : currentBikeCart })
            } break;
            case "racks": {
                let currentRackCart = user.buildCartRacks
                let removeIndex = currentRackCart.indexOf(req.params.partID)
                let removedPart = currentRackCart.splice(removeIndex,1)
                let futureRackCart = currentRackCart
                await User.findByIdAndUpdate(user._id, { buildCartRacks : futureRackCart })
            } break;
            case "seats": {
                let currentSeatCart = user.buildCartSeats
                let removeIndex = currentSeatCart.indexOf(req.params.partID)
                let removedPart = currentSeatCart.splice(removeIndex,1)
                let futureSeatCart = currentSeatCart
                await User.findByIdAndUpdate(user._id, { buildCartSeats : futureSeatCart })
            } break;
            case "storages": {
                let currentStorageCart = user.buildCartStorages
                let removeIndex = currentStorageCart.indexOf(req.params.partID)
                let removedPart = currentStorageCart.splice(removeIndex,1)
                let futureStorageCart = currentStorageCart
                await User.findByIdAndUpdate(user._id, { buildCartStorages : futureStorageCart })
            } break;
            case "trailers": {
                let currentTrailerCart = user.buildCartTrailers
                let removeIndex = currentTrailerCart.indexOf(req.params.partID)
                let removedPart = currentTrailerCart.splice(removeIndex,1)
                let futureTrailerCart = currentTrailerCart
                await User.findByIdAndUpdate(user._id, { buildCartTrailers : futureTrailerCart })
            } break;
            case "accessories": {
                let currentAccessoriesCart = user.buildCartAccessories
                let removeIndex = currentAccessoriesCart.indexOf(req.params.partID)
                let removedPart = currentAccessoriesCart.splice(removeIndex,1)
                let futureAccessoriesCart = currentAccessoriesCart
                await User.findByIdAndUpdate(user._id, { buildCartAccessories : futureAccessoriesCart })
            } break;
        }

        res.send("part removed").status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}


//app.put("/users/add-to-build-cart/:userID/:collectionURL/:partID", userController.putAddToBuildCart)

async function putAddToBuildCart  (req,res) {
    try {
        const user = await User.findById(req.params.userID)
        console.log(user)
        let collection = req.params.collectionURL
        console.log(collection)

        switch(collection){
            case "bikes": {
                let currentBikeCart = user.buildCartBikes
                let futureBikeCart = [req.params.partID,...currentBikeCart]
                await User.findByIdAndUpdate(user._id, { buildCartBikes : futureBikeCart })
            } break;
            case "racks": {
                let currentRackCart = user.buildCartRacks
                let futureRackCart = [req.params.partID,...currentRackCart]
                await User.findByIdAndUpdate(user._id, { buildCartRacks : futureRackCart })
            } break;
            case "seats": {
                let currentSeatCart = user.buildCartSeats
                let futureSeatCart = [req.params.partID,...currentSeatCart]
                await User.findByIdAndUpdate(user._id, { buildCartSeats : futureSeatCart })
            } break;
            case "storages": {
                let currentStorageCart = user.buildCartStorages
                let futureStorageCart = [req.params.partID,...currentStorageCart]
                await User.findByIdAndUpdate(user._id, { buildCartStorages : futureStorageCart })
            } break;
            case "trailers": {
                let currentTrailerCart = user.buildCartTrailers
                let futureTrailerCart = [req.params.partID,...currentTrailerCart]
                await User.findByIdAndUpdate(user._id, { buildCartTrailers : futureTrailerCart })
            } break;
            case "accessories": {
                let currentAccessoriesCart = user.buildCartAccessories
                let futureAccessoriesCart = [req.params.partID,...currentAccessoriesCart]
                await User.findByIdAndUpdate(user._id, { buildCartAccessories : futureAccessoriesCart })
            } break;
        }

        res.send("part updated").status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function putClearCarts  (req,res) {
    try {
        // const user = await User.findById(req.params.userID)
        // console.log(user)

        let user = await User.findByIdAndUpdate(req.params.userID, 
            {
                buildCartBikes: [],
                buildCartRacks: [],
                buildCartSeats: [],
                buildCartStorages: [],
                buildCartTrailers: [],
                buildCartAccessories: [],
            }
        )

        res.send("part updated").status(201)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

