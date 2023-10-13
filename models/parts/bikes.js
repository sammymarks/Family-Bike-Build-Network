const { Schema } = require("mongoose");

const BikeSchema = new Schema(
    {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        isElectricAssist: { type: Boolean, required: true },
        category: { type: String, required: true },
        year: { type: Number, required: false },
        urlProduct: { type: String, required: false },
        urlPic: { type: String, required: false },
        frameMaterials: { type: String, required: false },
        otherNotes: { type: String, required: false },
        addedByUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
      },
      { timestamps: true }
)

module.exports = {
    BikeSchema,
  };