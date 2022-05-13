import { Collection, FindCursor, MongoClient, ReturnDocument } from 'mongodb';
import { connectToDB } from './testing';

export async function fetchProdsAndTagsDB() {
  const USERNAME = process.env.MONGODB_USERNAME;
  const PASSWORD = process.env.MONGODB_PASSWORD;
  const DB = process.env.MONGODB_DB;
  const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.g13wh.mongodb.net/${DB}?retryWrites=true&w=majority`;
  
  const returnedProducts = [];
  const returnedTags = [];
  
  try {
    // Connect With DB
    const client = new MongoClient(url);
    await client.connect();
    console.log("DB connected is successfully!")

    // Get data
    const products: FindCursor = client.db(process.env.MONGODB_DB).collection("products").find();
    await products.forEach((item) => {
      returnedProducts.push(item);
    })

    const tags: FindCursor = client.db(process.env.MONGODB_DB).collection("tags").find();
    await tags.forEach((item) => {
      returnedTags.push(item);
    })

    // Close DB connection
    client.close();

    return { products: returnedProducts, tags: returnedTags };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong!" }
  }
}