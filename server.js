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

//Builds
app.get("/builds", buildController.getAll);
app.get("/builds/:id", buildController.getByID);

//Bikes
app.get("/bikes", bikeController.getAll);
app.get("/bikes/:id", bikeController.getByID);

//Racks
app.get("/racks", rackController.getAll);
app.get("/racks/:id", rackController.getByID);

//Seats
app.get("/seats", seatController.getAll);
app.get("/seats/:id", seatController.getByID);

//Storage
app.get("/storages", storageController.getAll);
app.get("/storages/:id", storageController.getByID);

//Trailer
app.get("/trailers", trailerController.getAll);
app.get("/trailers/:id", trailerController.getByID);

//Accessories
app.get("/accessories", accessoryController.getAll);
app.get("/accessories/:id", accessoryController.getByID);

//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
