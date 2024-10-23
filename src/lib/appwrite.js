import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_BASE_URL)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);

export const account = new Account(client);
export { ID } from "appwrite";
