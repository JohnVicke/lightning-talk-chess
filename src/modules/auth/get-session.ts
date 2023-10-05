import type { AstroCookies } from "astro";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";
import { Session } from "lib/upstash/session";

export async function getSession(cookies: AstroCookies) {
  if (!cookies?.has(HTTP_ONLY_AUTH_COOKIE_NAME)) {
    return null;
  }

  const sessionId = cookies.get(HTTP_ONLY_AUTH_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const profile = await Session.get(`session-${sessionId}`);

  return profile;
}
