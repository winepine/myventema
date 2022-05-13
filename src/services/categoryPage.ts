import { TypedQueryDocumentNode } from 'graphql';
import { url } from 'inspector';
import { Collection, FindCursor, MongoClient, ReturnDocument } from 'mongodb';
// import cookieCutter from 'cookie-cutter'

export async function getCategoryPageData(collectionName: string, findOne: {}) {
  try {
    const { client } = await mongoClient(url);
    if (!client) return { document: {} };
    const document = await client.db(process.env.MONGODB_DB).collection(collectionName).findOne(findOne);
    
    // client.close()
    return { document }
  } catch (error) {
    console.log("/services/mongodb/getDataFromCollection --> ", { error })
    return { error: "Something went wrong..." };
  }
}

export const mongoClient = async (res?: any, req?: any) => {
  // Connection URL
  const USERNAME = process.env.MONGODB_USERNAME;
  const PASSWORD = process.env.MONGODB_PASSWORD;
  const DB = process.env.MONGODB_DB;
  const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.g13wh.mongodb.net/${DB}?retryWrites=true&w=majority`;

  const client = new MongoClient(url);
  
  // const _global = global as any

  try {
    // if (_global.client) {
    //   return _global.client;
    // }

    await client.connect();
    console.log("DB connected is successfully!")

    // const cachedClient = _global.client;

    return { client: client };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong!" }
  }
}