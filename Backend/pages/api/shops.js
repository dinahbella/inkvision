import { mongooseConnect } from "../../lib/mongoose";
import { Shop } from "../../models/Shop";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { title, slug, images, description, tags, afilink, price, status } =
        req.body;

      // Validate required fields
      if (!title || !slug || !description || !afilink) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a new product
      const productDoc = await Shop.create({
        title,
        slug,
        images,
        description,
        tags,
        afilink,
        price,
        status,
      });

      res.status(201).json(productDoc);
    } else if (method === "GET") {
      if (req.query?.id) {
        // Fetch a single product by ID
        const product = await Shop.findById(req.query.id);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
      } else {
        // Fetch all products, sorted by newest first
        const products = await Shop.find().sort({ createdAt: -1 });
        res.json(products);
      }
    } else if (method === "PUT") {
      const {
        _id,
        title,
        slug,
        images,
        description,
        tags,
        afilink,
        price,
        status,
      } = req.body;

      // Validate required fields
      if (!_id || !title || !slug || !description || !afilink) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update the product
      const updatedProduct = await Shop.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
          description,
          tags,
          afilink,
          price,
          status,
        },
        { new: true } // Return the updated document
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(updatedProduct);
    } else if (method === "DELETE") {
      if (req.query?.id) {
        // Delete the product
        const deletedProduct = await Shop.findByIdAndDelete(req.query.id);
        if (!deletedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Missing product ID" });
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
