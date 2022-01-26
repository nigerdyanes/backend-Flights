import * as mongoose from 'mongoose';

export const PassagerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

PassagerSchema.index({ name: 1 }, { unique: true });
PassagerSchema.index({ emai: 1 }, { unique: true });
