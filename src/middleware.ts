import { defineMiddleware } from "astro:middleware";
import { getSession } from "modules/auth/get-session";

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.session = await getSession(context.cookies);
  return next();
});
