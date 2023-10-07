import { serverEnv } from "env/server";
import type { TokenResponse } from "./types";
import { responseToToken } from "./utils";

export async function codeExchange(code: string, verifier: string) {
  const params = new URLSearchParams();
  params.append("client_id", serverEnv.SPOTIFY_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:4321/api/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const tokenResponse = (await result.json()) as TokenResponse;

  return responseToToken(tokenResponse);
}
