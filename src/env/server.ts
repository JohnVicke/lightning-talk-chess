import { safeParse } from "valibot";
import { ServerEnvSchema } from "./schema";

const runtimeEnv = import.meta.env ?? process.env;

const result = safeParse(ServerEnvSchema, runtimeEnv);

if (!result.success) {
  console.error(result.issues);
  process.exit(1);
}

export const serverEnv = result.output;
