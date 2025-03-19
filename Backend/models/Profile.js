const { Schema, models, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Profile =
  models.Profile || model("Profile", ProfileSchema, "profile");
