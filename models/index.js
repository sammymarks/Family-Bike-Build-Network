const mongoose = require('mongoose')

const bikeSchema = require('./bikes')
const trailerSchema = require('./trailers')
const seatSchema = require('./seats')
const rackSchema = require('./racks')




const Bike = mongoose.model('bikes', bikeSchema)
const Trailer = mongoose.model('trailers', trailerSchema)
const Seat = mongoose.model('seats', seatSchema)
const Rack = mongoose.model('racks', rackSchema)





module.exports = {
  Bike,
  Trailer,
  Seat,
  Rack,

}
