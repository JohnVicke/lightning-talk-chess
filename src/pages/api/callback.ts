import type { APIContext } from "astro";
import { db, eq, schema } from "db";
import { codeExchange } from "lib/spotify/code-exchange";
import { fetchProfile } from "lib/spotify/fetch-profile";
import { setSession } from "modules/auth/set-session";

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
      where: (user) => eq(user.id, profile.id),
    });

    if (!userExists) {
      await db.insert(schema.users).values({
        id: profile.id,
        displayName: profile.display_name,
        email: profile.email,
      });
    }

    const sessionId = crypto.randomUUID();

    await setSession({
      profileId: profile.id,
      tokenResponse,
      sessionId,
      cookies,
    });

    return redirect("/");
  } catch (e) {
    console.error(e);
    return redirect("/callback?error=server_error");
  }
}
