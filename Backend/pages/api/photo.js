import { mongooseConnect } from "../../lib/mongoose";
import { Photo } from "../../models/Photo";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { title, slug, images } = req.body;

      // Validate required fields
      if (!title || !slug || !images) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a new photo
      const photoDoc = await Photo.create({
        title,
        slug,
        images,
      });

      res.status(201).json(photoDoc);
    } else if (method === "GET") {
      if (req.query?.id) {
        // Fetch a single photo by ID
        const photo = await Photo.findById(req.query.id);
        if (!photo) {
          return res.status(404).json({ error: "Photo not found" });
        }
        res.json(photo);
      } else {
        // Fetch all photos, sorted by newest first
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.json(photos);
      }
    } else if (method === "PUT") {
      const { _id, title, slug, images } = req.body;

      // Validate required fields
      if (!_id || !title || !slug) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update the photo
      const updatedPhoto = await Photo.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
        },
        { new: true } // Return the updated document
      );

      if (!updatedPhoto) {
        return res.status(404).json({ error: "Photo not found" });
      }

      res.json(updatedPhoto);
    } else if (method === "DELETE") {
      if (req.query?.id) {
        // Delete the photo
        const deletedPhoto = await Photo.findByIdAndDelete(req.query.id);
        if (!deletedPhoto) {
          return res.status(404).json({ error: "Photo not found" });
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Missing photo ID" });
      }
    } else {
      // Handle unsupported methods
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
