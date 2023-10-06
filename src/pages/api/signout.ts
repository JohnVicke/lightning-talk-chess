import type { APIContext } from "astro";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";
import { Session } from "lib/upstash/session";

export async function POST({ redirect, cookies, locals }: APIContext) {
  locals.session = null;
  cookies.delete(HTTP_ONLY_AUTH_COOKIE_NAME);
  await Session.delete(`session-${locals.session}`);
  return redirect("/");
}
