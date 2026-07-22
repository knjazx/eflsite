import { MongoClient, Db, Collection as MongoCollection } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Добавьте MONGODB_URI в .env файл');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('efl_league');
}

export async function getCollection<T = any>(name: string): Promise<MongoCollection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

// Маппинг названий коллекций
export const COLLECTION_MAP: Record<string, string> = {
  users: 'pl_users',
  teams: 'pl_teams',
  players: 'pl_players',
  tournaments: 'pl_tournaments',
  matches: 'pl_matches',
  news: 'pl_news',
  groups: 'pl_groups',
  vetos: 'pl_vetos',
  awards: 'pl_awards',
};

export default clientPromise;
