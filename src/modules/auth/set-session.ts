import type { AstroCookies } from "astro";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";
import type { Token } from "lib/spotify/types";
import { Session } from "lib/upstash/session";

interface SetSessionOptions {
  tokenResponse: Token;
  profileId: string;
  sessionId: string;
  cookies: AstroCookies;
}

export async function setSession({
  sessionId,
  profileId,
  tokenResponse,
  cookies,
}: SetSessionOptions) {
  await Session.set(`session-${sessionId}`, {
    profileId,
    ...tokenResponse,
  });

  cookies.set(HTTP_ONLY_AUTH_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: "/",
    domain: "localhost",
  });

  return true;
}
