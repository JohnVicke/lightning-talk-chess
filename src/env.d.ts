/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
//
interface ImportMetaEnv {
  readonly DATABASE_AUTH_TOKEN: string;
  readonly DATABASE_URL: string;
  readonly REDIS_TOKEN: string;
  readonly REDIS_URL: string;
  readonly SPOTIFY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
