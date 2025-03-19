import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../lib/mongodb";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = await connectDB();
        const collection = db.collection("admin");

        const user = await collection.findOne({
          email: credentials.email,
        });
        if (user && user.password === credentials.password) {
          return { id: user._id, email: user.email };
        }
        return null;
      },
    }),
  ],
  database: process.env.MONGODB,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.SECRET,
});
