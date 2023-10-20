const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        location: { type: String, required: true },
        profilePic: { type: String, required: false },
        isAdmin: { type: Boolean, required: true },
        buildCartBikes: [{ type: Schema.Types.ObjectId, ref: 'Bike', required: false }],
        buildCartAccessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory', required: false }],
        buildCartRacks: [{ type: Schema.Types.ObjectId, ref: 'Rack', required: false }],
        buildCartStorages: [{ type: Schema.Types.ObjectId, ref: 'Storage', required: false }],
        buildCartTrailers: [{ type: Schema.Types.ObjectId, ref: 'Trailer', required: false }],
        buildCartSeats: [{ type: Schema.Types.ObjectId, ref: 'Seat', required: false }],
    },
    { timestamps: true }
)

module.exports = UserSchema