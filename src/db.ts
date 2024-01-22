import { config } from "dotenv";
import mongoose from "mongoose";
import { Post } from "./models/post";
config();

const connectionString = process.env.MONGODB_COONECTION_STRING;

export const addPost = async (
    title: string,
    author: string,
    body: string,
    hidden: boolean) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = new Post();
        post.title = title;
        post.body = body;
        post.author = author;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPosts = async () => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await Post.find();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const deletePost = async (id: string) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await Post.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const updatePost = async (
    id: string,
    title: string | undefined,
    author?: string,
    body?: string,
    hidden?: boolean) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = await Post.findById(id);

        if (post) {
            if (title) post.title = title;
            if (author) post.author = author;
            if (body) post.body = body;
            if (hidden) post.hidden = hidden;
            return await post.save();
        } else {
            throw new Error("Post non trovato");
        }

    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}