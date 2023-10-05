import { serverEnv } from "env/server";

const SCOPE = "user-read-private user-read-email playlist-read-private";

function generateCodeVerifier(length: number) {
  let text = "";

  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function generateSignin() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  const params = new URLSearchParams();
  params.append("client_id", serverEnv.SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:4321/api/callback");
  params.append("scope", SCOPE);
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  return {
    url: `https://accounts.spotify.com/authorize?${params.toString()}`,
    verifier,
  };
}
