import type { AstroCookies } from "astro";
import { Session } from "redis/session";

export async function getSession(cookies: AstroCookies) {
  if (!cookies || !cookies.has("session")) {
    return false;
  }

  const sessionId = cookies.get("session")?.value;

  if (!sessionId) {
    return false;
  }

  const profile = await Session.get(`session-${sessionId}`);

  return profile;
}
