import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema(
  {
    pilot: { type: String, required: true },
    airPlane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    fligthDate: { type: Date, required: true },
    passagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passagers' }],
  },
  {
    timestamps: true,
  },
);
