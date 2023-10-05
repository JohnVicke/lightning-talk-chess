import { Redis } from "@upstash/redis";
import { serverEnv } from "env/server";

export const createRedis = () =>
  new Redis({
    url: serverEnv.REDIS_URL,
    token: serverEnv.REDIS_TOKEN,
  });
