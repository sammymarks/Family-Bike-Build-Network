const mongoose = require('mongoose')

//Import Parts
const bikeSchema = require('./parts/bikes')
const trailerSchema = require('./parts/trailers')
const seatSchema = require('./parts/seats')
const rackSchema = require('./parts/racks')
const storageSchema = require('./parts/storages')
const accessorySchema = require('./parts/accessories')
const buildSchema = require('./builds')
const userSchema = require('./users')

//Define Schema
const Bike = mongoose.model('bikes', bikeSchema)
const Trailer = mongoose.model('trailers', trailerSchema)
const Seat = mongoose.model('seats', seatSchema)
const Rack = mongoose.model('racks', rackSchema)
const Storage = mongoose.model('storages', storageSchema)
const Accessory = mongoose.model('accessories', accessorySchema)
const Build = mongoose.model('builds', buildSchema)
const User = mongoose.model('users', userSchema)

//Export
module.exports = {
  Bike,
  Trailer,
  Seat,
  Rack,
  Storage,
  Accessory,
  Build,
  User
}
