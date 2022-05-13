import { TypedQueryDocumentNode } from 'graphql';
import { Collection, FindCursor, MongoClient, ReturnDocument } from 'mongodb';

export async function getSingleDocument(collectionName: string, findOne: {}) {
  try {
    const { client } = await mongoClient();
    if (!client) return { document: {} };

    const document = await client.db(process.env.MONGODB_DB).collection(collectionName).findOne(findOne);
    
    client.close()
    return { document }
  } catch (error) {
    console.log("/services/mongodb/getDataFromCollection --> ", { error })
    return { error: "Something went wrong..." };
  }
}

export async function getDataFromCollection(collectionName: string) {
  let returnedProducts: any[] = [];

  try {
    const { client } = await mongoClient();
    if (!client) return { products: [] };

    const products: FindCursor = client.db(process.env.MONGODB_DB).collection(collectionName).find();
    await products.forEach((item) => {
      returnedProducts.push(item);
    })
    
    client.close()
    return { products: returnedProducts }
  } catch (error) {
    console.log("/services/mongodb/getDataFromCollection --> ", { error })
    return { error: "Something went wrong..." };
  }
}

export async function appendDataIntoCollection(data: {}, collectionName: string) {
  const { client, error } = await mongoClient();

  try {
    const session = client?.startSession();
    session?.startTransaction();

    const collection: Collection | undefined = client?.db(process.env.MONGODB_DB).collection(collectionName);
    if (!collection) throw new Error();

    await collection?.insertOne(data);

    session?.commitTransaction();
    await session?.endSession();

    return { data }
  } catch (error) {
    console.log("services/mongodb/appendDataIntoCollection --> ", { error })
    return { error: 'Something went wrong...' }
  }
}

export async function insertDataIntoCollection(data: any[], collectionName: string) {
  const { client, error } = await mongoClient();
  
  try {
    const session = client?.startSession();
    session?.startTransaction();
    
    const collection: Collection | undefined = client?.db(process.env.MONGODB_DB).collection(collectionName);
    if (!collection) throw new Error();
  
    await dropCollection(collection);
    await collection?.insertMany(data);

    session?.commitTransaction();
    await session?.endSession();

    return { data }
  } catch (error) {
    console.log("services/mongodb/insertDataIntoCollection --> ", { error })
    return { error: 'Something went wrong...' }
  }
} 

const mongoClient = async () => {
  // Connection URL
  const USERNAME = process.env.MONGODB_USERNAME;
  const PASSWORD = process.env.MONGODB_PASSWORD;
  const DB = process.env.MONGODB_DB;
  const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.g13wh.mongodb.net/${DB}?retryWrites=true&w=majority`;

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("DB connected is successfully!")

    return { client };
  } catch (error) {
    return { error: "Something went wrong!" }
    console.log({ error });
  }
}

const dropCollection = async (collection: Collection) => {
  try {
    const count: number | undefined = await collection?.countDocuments()
    if (typeof count === "number" && count > 0) {
      collection?.drop();
    }
  } catch (error) {
    console.log('/countDocument --> ', { error })
  }
}