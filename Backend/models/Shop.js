const { Schema, models, model } = require("mongoose");
const ProductSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }], // Array of strings
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: Number },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Shop = models.Shop || model("Shop", ProductSchema, "shops");
