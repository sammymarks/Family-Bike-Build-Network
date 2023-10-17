const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//-------Imports-------
//Schemas
const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`./models/index.js`)
//Controllers
const userController = require("./controllers/UserControllers")
const buildController = require('./controllers/BuildControllers')
const bikeController = require('./controllers/PartsControllers/BikeControllers')
const accessoryController = require('./controllers/PartsControllers/AccessoryControllers')
const rackController = require('./controllers/PartsControllers/RackControllers')
const seatController = require('./controllers/PartsControllers/SeatControllers')
const trailerController = require('./controllers/PartsControllers/TrailerControllers')
const storageController = require('./controllers/PartsControllers/StorageControllers')





//-------END Imports -------

const PORT = process.env.PORT || 3001;

//middleware
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
//end middleware


//-------CRUD-------
//Index
app.get("/", (req, res) => res.send("This is Index"));

//Users
app.get("/users", userController.getAll);
app.get("/users/:id", userController.getByID);
app.put("/users/add-to-build-cart/:userID/:collectionURL/:partID", userController.putAddToBuildCart)

//Builds
app.get("/builds", buildController.getAll);
app.get("/builds/:id", buildController.getByID);

//Bikes
app.get("/bikes", bikeController.getAll);
app.get("/bikes/:id", bikeController.getByID);
app.put("/bikes/add-user-like/:partID/:userID", bikeController.putAddUserLike)
app.put("/bikes/remove-user-like/:partID/:userID", bikeController.putRemoveUserLike)

//Racks
app.get("/racks", rackController.getAll);
app.get("/racks/:id", rackController.getByID);
app.put("/racks/add-user-like/:partID/:userID", rackController.putAddUserLike)
app.put("/racks/remove-user-like/:partID/:userID", rackController.putRemoveUserLike)

//Seats
app.get("/seats", seatController.getAll);
app.get("/seats/:id", seatController.getByID);
app.put("/seats/add-user-like/:partID/:userID", seatController.putAddUserLike)
app.put("/seats/remove-user-like/:partID/:userID", seatController.putRemoveUserLike)

//Storage
app.get("/storages", storageController.getAll);
app.get("/storages/:id", storageController.getByID);
app.put("/storages/add-user-like/:partID/:userID", storageController.putAddUserLike)
app.put("/storages/remove-user-like/:partID/:userID", storageController.putRemoveUserLike)

//Trailer
app.get("/trailers", trailerController.getAll);
app.get("/trailers/:id", trailerController.getByID);
app.put("/trailers/add-user-like/:partID/:userID", trailerController.putAddUserLike)
app.put("/trailers/remove-user-like/:partID/:userID", trailerController.putRemoveUserLike)

//Accessories
app.get("/accessories", accessoryController.getAll);
app.get("/accessories/:id", accessoryController.getByID);
app.put("/accessories/add-user-like/:partID/:userID", accessoryController.putAddUserLike)
app.put("/accessories/remove-user-like/:partID/:userID", accessoryController.putRemoveUserLike)

//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
