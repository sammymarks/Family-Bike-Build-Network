const { Schema } = require("mongoose");

const TrailerSchema = new Schema(
    {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        category: { type: String, required: true },
        passengerCount: { type: Number, required: false },
        urlProduct: { type: String, required: false },
        urlPic: { type: String, required: false },
        isStroller: { type: Boolean, required: false },
        otherNotes: { type: String, required: false },
        addedByUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      },
      { timestamps: true }
)

module.exports = {
    TrailerSchema,
  };