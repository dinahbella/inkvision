import { mongooseConnect } from "../../lib/mongoose";
import { Contact } from "../../models/Contact";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const {
        name,
        iname,
        email,
        phone,
        company,
        country,
        price,
        description,
        project,
      } = req.body;

      // Validate required fields
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a new contact
      const contactDoc = await Contact.create({
        name,
        iname,
        email,
        phone,
        company,
        country,
        price,
        description,
        project,
      });

      res.status(201).json(contactDoc);
    } else if (method === "GET") {
      if (req.query?.id) {
        // Fetch a single contact by ID
        const contact = await Contact.findById(req.query.id);
        if (!contact) {
          return res.status(404).json({ error: "Contact not found" });
        }
        res.json(contact);
      } else {
        // Fetch all contacts, sorted by newest first
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
      }
    } else if (method === "PUT") {
      const {
        _id,
        name,
        iname,
        email,
        phone,
        company,
        country,
        price,
        description,
        project,
      } = req.body;

      // Validate required fields
      if (!_id || !name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update the contact
      const updatedContact = await Contact.findByIdAndUpdate(
        _id,
        {
          name,
          iname,
          email,
          phone,
          company,
          country,
          price,
          description,
          project,
        },
        { new: true } // Return the updated document
      );

      if (!updatedContact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json(updatedContact);
    } else if (method === "DELETE") {
      if (req.query?.id) {
        // Delete the contact
        const deletedContact = await Contact.findByIdAndDelete(req.query.id);
        if (!deletedContact) {
          return res.status(404).json({ error: "Contact not found" });
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Missing contact ID" });
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
