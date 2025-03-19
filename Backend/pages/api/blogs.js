import { mongooseConnect } from "../../lib/mongoose";
import { Blog } from "../../models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { title, slug, images, description, blogcategory, tags, status } =
        req.body;

      // Validate required fields
      if (!title || !slug || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a new blog
      const blogDoc = await Blog.create({
        title,
        slug,
        images,
        description,
        blogcategory,
        tags,
        status,
      });

      return res.status(201).json(blogDoc);
    }

    if (method === "GET") {
      if (req.query?.id) {
        // Fetch a single blog by ID
        const blog = await Blog.findById(req.query.id);
        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        return res.json(blog);
      } else {
        // Fetch all blogs
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
        return res.json(blogs);
      }
    }

    if (method === "PUT") {
      const {
        _id,
        title,
        slug,
        images,
        description,
        blogcategory,
        tags,
        status,
      } = req.body;

      // Validate required fields
      if (!_id || !title || !slug || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update the blog
      const updatedBlog = await Blog.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
          description,
          blogcategory,
          tags,
          status,
        },
        { new: true } // Return the updated document
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      return res.json(updatedBlog);
    }

    if (method === "DELETE") {
      if (req.query?.id) {
        // Delete the blog
        const deletedBlog = await Blog.findByIdAndDelete(req.query.id);
        if (!deletedBlog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        return res.json({ success: true });
      } else {
        return res.status(400).json({ error: "Missing blog ID" });
      }
    }

    // Handle unsupported methods
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
