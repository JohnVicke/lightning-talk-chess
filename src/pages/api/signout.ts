import type { APIContext } from "astro";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";

export async function POST({ redirect, cookies, locals }: APIContext) {
  locals.session = null;
  cookies.delete(HTTP_ONLY_AUTH_COOKIE_NAME);
  return redirect("/");
}
