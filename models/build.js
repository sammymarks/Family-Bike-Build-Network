const { Schema } = require("mongoose");

const BuildSchema = new Schema(
    {
        ownerUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        buildName: { type: String, required: true },
        buildNotes: { type: String, required: true },
        buildPic: { type: String, required: false },
        bikeObj: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        trailerObjs: [{ type: Schema.Types.ObjectId, ref: 'Trailer', required: false }],
        seatObjs: [{ type: Schema.Types.ObjectId, ref: 'Seat', required: false }],
        rackObjs: [{ type: Schema.Types.ObjectId, ref: 'Rack', required: false }],
        storageObjs: [{ type: Schema.Types.ObjectId, ref: 'Storage', required: false }],
        accessoryObjs: [{ type: Schema.Types.ObjectId, ref: 'Accessory', required: false }],
        likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    },
    { timestamps: true }
)

module.exports = BuildSchema
