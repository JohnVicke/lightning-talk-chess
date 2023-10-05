import { object, string, url, minLength } from "valibot";

export const ServerEnvSchema = object({
  DATABASE_AUTH_TOKEN: string([minLength(1)]),
  DATABASE_URL: string([url()]),
  REDIS_TOKEN: string([minLength(1)]),
  REDIS_URL: string([url()]),
  SPOTIFY_CLIENT_ID: string([minLength(1)]),
});
