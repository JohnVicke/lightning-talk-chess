/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { Session } from "lib/upstash/session";

declare namespace App {
  interface Locals {
    session: Session | null;
  }
}
