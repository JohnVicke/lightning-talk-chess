import type { APIContext } from "astro";
import { db, eq } from "db";

export async function GET({ request, redirect, cookies }: APIContext) {
  const id = "jävlaskitspotify";
  try {
    const userExists = await db.query.users.findFirst({
      where: (user) => eq(user.id, id),
    });
    return new Response(JSON.stringify(userExists), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e }), {
      headers: { "content-type": "application/json" },
    });
  }
}
