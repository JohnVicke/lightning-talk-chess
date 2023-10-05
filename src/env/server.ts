import { safeParse } from "valibot";
import { ServerEnvSchema } from "./schema";

const result = safeParse(ServerEnvSchema, process.env);

if (!result.success) {
  console.error(JSON.stringify(result.issues, null, 2));
  for (const issue of result.issues) {
    const dotPath = issue.path?.map((item) => item.key).join(".");
    console.error(`Error in ${dotPath}: ${issue.message}`);
  }
  process.exit(1);
}

export const serverEnv = result.output;
