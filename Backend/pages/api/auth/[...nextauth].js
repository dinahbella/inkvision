import { signIn } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      res.status(401).json({ error: result.error });
    } else {
      res.status(200).json({ message: "Sign-in successful" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
