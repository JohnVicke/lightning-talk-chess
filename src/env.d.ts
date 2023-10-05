/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
//
interface ImportMetaEnv {
  readonly SPOTIFY_CLIENT_ID: string;
  readonly DATABASE_URL: string;
  readonly DATABASE_AUTH_TOKEN: string;
  readonly REDIS_URL: string;
  readonly REDIS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
