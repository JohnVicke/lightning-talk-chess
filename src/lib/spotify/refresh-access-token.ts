import { createSearchParams } from "utils/create-search-params";
import { serverEnv } from "env/server";
import type { TokenResponse } from "./types";
import { responseToToken } from "./utils";

export async function refreshAccessToken(refreshToken: string) {
  const params = createSearchParams({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    client_id: serverEnv.SPOTIFY_CLIENT_ID,
  });

  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const tokenResponse = (await res.json()) as TokenResponse;
  return responseToToken(tokenResponse);
}
