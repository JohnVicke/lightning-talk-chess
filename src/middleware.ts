import { defineMiddleware } from "astro:middleware";
import { HTTP_ONLY_AUTH_COOKIE_NAME } from "config/constants";
import { refreshAccessToken } from "lib/spotify/refresh-access-token";
import { getSession } from "modules/auth/get-session";
import { setSession } from "modules/auth/set-session";

export const onRequest = defineMiddleware(async (context, next) => {
  const session = await getSession(context.cookies);
  console.log(session);

  if (!session) {
    context.locals.session = null;
    return next();
  }

  const expiredAccessToken = session.expiresAt < Date.now();

  if (!expiredAccessToken) {
    context.locals.session = session;
    return next();
  }

  console.log("expired?");

  const refreshedSession = await refreshAccessToken(session.refreshToken);

  const sessionId = context.cookies.get(HTTP_ONLY_AUTH_COOKIE_NAME);

  await setSession({
    cookies: context.cookies,
    sessionId: sessionId!.value,
    profileId: session.profileId,
    tokenResponse: refreshedSession,
  });

  context.locals.session = {
    ...session,
    ...refreshedSession,
  };

  return next();
});
