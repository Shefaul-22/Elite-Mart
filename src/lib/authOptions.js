import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                // Authenticate user via our custom loginUser server action
                const user = await loginUser({
                    email: credentials.email,
                    password: credentials.password,
                });

                // If user is found and password matches, return user object
                if (user) {
                    return user;
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                const usersCollection = await dbConnect(collections.USERS);
                const isExist = await usersCollection.findOne({ email: user.email });

                // If user already exists in DB, allow sign in
                if (isExist) {
                    return true;
                }

                // If it's a new user (usually via Google), create a new entry
                const newUser = {
                    provider: account?.provider,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: "user",
                    createdAt: new Date(),
                };

                const result = await usersCollection.insertOne(newUser);
                return result.acknowledged;
            } catch (error) {
                console.error("SIGN_IN_CALLBACK_ERROR:", error);
                return false;
            }
        },

        async jwt({ token, user, account }) {
            // This runs on sign in. We attach DB data to the token.
            if (user) {
                const usersCollection = await dbConnect(collections.USERS);
                const dbUser = await usersCollection.findOne({ email: user.email });

                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                    token.picture = dbUser.image; // Ensure the latest image is in the token
                }
            }
            return token;
        },

        async session({ session, token }) {
            // Pass data from token to the frontend session object
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
    // Added secret and session strategy for better reliability
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // Redirect to custom login page if needed
    },
};