import { Client, Databases , Account } from "appwrite";

export const PROJECT_ID = "654738ec584aa6a2d059";
export const DATABASE_ID = "65473dccf1fdb9fb0626";
export const COLLECTION_ID_MESSAGES = "65473ddaddc30e7c00ec";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APP_END_POINT)
  .setProject(import.meta.env.VITE_APP_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
