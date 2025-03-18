const { Schema, models, model } = require("mongoose");
const ProjectSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }], // Array of strings
    description: { type: String },
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    livepreview: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Project =
  models.Project || model("Project", ProjectSchema, "projects");
