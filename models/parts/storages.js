const { Schema } = require("mongoose");

const StorageSchema = new Schema(
    {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        mountingType: { type: String, required: true },
        volumeLiters: { type: String, required: true },
        urlProduct: { type: String, required: false },
        urlPic: { type: String, required: false },
        otherNotes: { type: String, required: false },
        addedByUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
      },
      { timestamps: true }
)

module.exports = {
    StorageSchema,
  };