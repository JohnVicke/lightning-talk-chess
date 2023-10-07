import type { Token, TokenResponse } from "./types";

export function responseToToken(response: TokenResponse) {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: Date.now() + response.expires_in * 1000,
    tokenType: response.token_type,
    scope: response.scope,
  } satisfies Token;
}
