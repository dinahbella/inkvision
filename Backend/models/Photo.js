const { Schema, models, model } = require("mongoose");
const PhotoSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }], // Array of strings
  },
  {
    timestamps: true,
  }
);

export const Photo = models.Photo || model("Photo", PhotoSchema, "photos");
