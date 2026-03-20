"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const { email, password, name, image } = payload;

    // 1. Basic validation for required fields
    if (!email || !password || !name) {
      return { success: false, message: "Missing required fields" };
    }

    const usersCollection = await dbConnect(collections.USERS);

    // 2. Check if the user already exists in the database
    const isExist = await usersCollection.findOne({ email });
    if (isExist) {
      return {
        success: false,
        acknowledged: false, // Required for frontend state handling
        message: "User already exists"
      };
    }

    // 3. Hash the password (Salt round 10 is standard for security and performance)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      provider: "credentials",
      name,
      email,
      image: image || "", // Fallback to empty string if no image provided
      password: hashedPassword,
      role: "user",
      createdAt: new Date(), // Storing registration timestamp
    };

    // 4. Save the new user to the database
    const result = await usersCollection.insertOne(newUser);

    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId?.toString(),
    };

  } catch (error) {
    console.error("POST_USER_ERROR:", error);
    return {
      success: false,
      acknowledged: false,
      message: "Internal Server Error"
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password } = payload;

    if (!email || !password) return null;

    const usersCollection = await dbConnect(collections.USERS);
    const user = await usersCollection.findOne({ email });

    // Ensure user exists and has a password (for credentials provider)
    if (!user || !user.password) {
      return null;
    }

    // Verify the provided password with the stored hash
    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {
      // Security: Remove sensitive password field before returning user object
      const { password, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        _id: user._id.toString(), // Convert MongoDB ObjectId to string for NextAuth
      };
    }

    return null;
  } catch (error) {
    console.error("LOGIN_USER_ERROR:", error);
    return null;
  }
};