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



//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
