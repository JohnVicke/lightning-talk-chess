import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { serverEnv } from "env/server";

const client = createClient({
  url: serverEnv.DATABASE_URL,
  authToken: serverEnv.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
