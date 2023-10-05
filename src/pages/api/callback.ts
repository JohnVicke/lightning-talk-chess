import type { APIContext } from "astro";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";
import { db, schema } from "db";
import { fetchProfile } from "lib/spotify/fetch-profile";
import { codeExchange } from "lib/spotify/code-exchange";
import { Session } from "lib/upstash/session";

function getSearchParams(url: string) {
  const queryString = url.split("?")?.at(1);
  return new URLSearchParams(queryString);
}

export async function GET({ request, redirect, cookies }: APIContext) {
  const searchParams = getSearchParams(request.url);
  const code = searchParams.get("code");
  const verifier = cookies.get("verifier");

  if (!code) {
    return redirect("/callback?error=invalid_code");
  }

  if (!verifier?.value) {
    return redirect("/callback?error=invalid_verifier");
  }

  try {
    const tokenResponse = await codeExchange(code, verifier.value);
    const profile = await fetchProfile(tokenResponse.accessToken);

    const userExists = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, profile.id),
    });

    if (!userExists) {
      await db.insert(schema.users).values({
        id: profile.id,
        displayName: profile.display_name,
        email: profile.email,
      });
    }

    const sessionId = crypto.randomUUID();

    await Session.set(`session-${sessionId}`, {
      profileId: profile.id,
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

    return redirect("/");
  } catch (e) {
    return redirect("/callback?error=server_error");
  }
}
