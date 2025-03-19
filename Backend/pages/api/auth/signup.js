import mongooseConnect from "../../../lib/mongoose";
import { Profile } from "../../../models/Profile";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to MongoDB
    await mongooseConnect();

    // Extract data from the request body
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Profile.create({ email, password: hashedPassword });

    // Return success response
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
