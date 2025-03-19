import mongooseConnect from "../../../lib/mongoose";
import { Profile } from "../../../models/Profile";
export default async function handler(req, res) {
  await mongooseConnect();

  const { email, password } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //  create new user
    const newUser = new Profile.create({ email, password });
    res.status(201).json({ message: "User createdd successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
