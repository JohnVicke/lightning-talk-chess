/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  type Session = import("lib/upstash/session").Session;
  interface Locals {
    session: Session | null;
  }
}
