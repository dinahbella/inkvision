import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Connect to the database
        const { db, client } = await connectDB();
        try {
          const collection = db.collection("admin");

          // Find the user by email
          const user = await collection.findOne({ email: credentials.email });

          // Check if user exists and compare hashed password
          if (user && user.password === credentials.password) {
            return { id: user._id.toString(), email: user.email };
          }

          throw new Error("Invalid credentials");
        } finally {
          await client.close(); // Ensure DB connection is closed
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.SECRET, // Use NEXTAUTH_SECRET instead of SECRET
  session: {
    strategy: "jwt",
  },
});
