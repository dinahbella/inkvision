import { mongooseConnect } from "../../lib/mongoose";
import { Blog } from "../../models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { title, slug, images, description, blogcategory, tags, status } =
        req.body;

      if (!title || !slug || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const blogDoc = await Blog.create({
        title,
        slug,
        images,
        description,
        blogcategory,
        tags,
        status,
      });

      res.status(201).json(blogDoc);
    }
    try {
      if (req.method === "GET") {
        if (req.query?.id) {
          // Fetch a single blog by ID
          const blog = await Blog.findById(req.query.id);
          if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
          }
          res.json(blog);
        } else {
          // Fetch all blogs
          const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
          res.json(blogs);
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error in /api/blogs:", error);
      res.status(500).json({ error: "Internal server error" });
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

      if (!_id || !title || !slug || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

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
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json(updatedBlog);
    }

    if (method === "DELETE") {
      if (req.query?.id) {
        const deletedBlog = await Blog.findByIdAndDelete(req.query.id);
        if (!deletedBlog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Missing blog ID" });
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
