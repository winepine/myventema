import { MongoClient } from 'mongodb';

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DB = process.env.MONGODB_DB;
const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.g13wh.mongodb.net/${DB}?retryWrites=true&w=majority`;

const global = globalThis
let cached = global?.mongo;
if (!cached) {
  cached = global.mongo = {}
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  
  const conn: any = {}
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }

  const client = new MongoClient(url)
  await client.connect();

  console.log("Db connected")

  conn.client = client;
  cached.conn = conn;

  return cached.conn;
}