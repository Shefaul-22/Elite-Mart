"use server"
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const postProduct = async (payload) => {
    try {
        const { title, price, shortDesc, fullDesc, image } = payload;

        // validation
        if (!title || !price || !shortDesc || !fullDesc) {
            return { success: false, message: "Missing required fields" };
        }

        const productsCollection = await dbConnect(collections.PRODUCTS);

        // NewProduct
        const newProduct = {
            title,
            price: parseFloat(price),
            shortDesc,
            fullDesc,
            image: image || "",
            createdAt: new Date(),
        };

        // save to database
        const result = await productsCollection.insertOne(newProduct);

        return {
            success: true,
            acknowledged: result.acknowledged,
            insertedId: result.insertedId?.toString(),
        };

    } catch (error) {
        console.error("POST_PRODUCT_ERROR:", error);
        return {
            success: false,
            acknowledged: false,
            message: "Internal Server Error"
        };
    }
};

export const getProducts = async () => {
    try {
        const productsCollection = await dbConnect(collections.PRODUCTS);
   
        const products = await productsCollection.find().sort({ createdAt: -1 }).toArray();

        return JSON.parse(JSON.stringify(products)); // Next.js Client Component এর জন্য সিরিয়ালাইজ করা
    } catch (error) {
        console.error("GET_PRODUCTS_ERROR:", error);
        return [];
    }
};

// delete product functionality
export const deleteProduct = async (id) => {
    try {
        const productsCollection = await dbConnect(collections.PRODUCTS);
        const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 1) {
            return { success: true, message: "Product deleted successfully" };
        }
        return { success: false, message: "Product not found" };
    } catch (error) {
        console.error("DELETE_PRODUCT_ERROR:", error);
        return { success: false, message: "Internal server error" };
    }
};