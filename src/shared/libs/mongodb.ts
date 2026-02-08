import { MongoClient, ServerApiVersion } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("MONGODB_URI missing");
}

const options = {
  appName: "blog-statistics",
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

attachDatabasePool(client);

export default clientPromise;