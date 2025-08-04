import { MongoClient } from 'mongodb';

// Use a default URI for development if not provided
const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


  client = new MongoClient(uri, options);
  clientPromise = client.connect();


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared between functions.
export default clientPromise; 