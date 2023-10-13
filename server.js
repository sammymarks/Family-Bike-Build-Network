const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//-------Imports - Controllers-------

//-------END Imports - Controllers -------

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


//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
