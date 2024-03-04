
import { env } from '$env/dynamic/private';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
//import { dev } from '$app/environment';

// const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });
const client =  postgres(env.DATABASE_URL) 
export const db = drizzle(client, {});