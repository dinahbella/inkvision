import { MongoClient } from "mongodb";

export default async function connectDB() {
  const client = new MongoClient(process.env.MONGODB);
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.log("Error connecting to the database:", error);
    throw error;
  }
}
