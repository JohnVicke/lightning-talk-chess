import { object, string, nonNullable, url } from "valibot";

export const ServerEnvSchema = object({
  DATABASE_AUTH_TOKEN: nonNullable(string()),
  DATABASE_URL: nonNullable(string([url()])),
  REDIS_TOKEN: nonNullable(string()),
  REDIS_URL: nonNullable(string([url()])),
  SPOTIFY_CLIENT_ID: nonNullable(string()),
});
