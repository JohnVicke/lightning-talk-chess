import { serverEnv } from "env/server";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

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

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
    token_type: tokenType,
    scope,
  } = (await result.json()) as AccessTokenResponse;

  const expiresAt = Date.now() + expiresIn;

  return { accessToken, refreshToken, expiresAt, tokenType, scope };
}
