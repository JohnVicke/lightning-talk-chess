import { serverEnv } from "env/server";

export function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function redirectToAuthCodeFlowUrl() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  const params = new URLSearchParams();
  params.append("client_id", serverEnv.SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:4321/callback");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  return {
    url: `https://accounts.spotify.com/authorize?${params.toString()}`,
    verifier,
  };
}

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export async function getAccessToken(code: string, verifier: string) {
  const params = new URLSearchParams();
  params.append("client_id", serverEnv.SPOTIFY_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:4321/callback");
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

interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}
