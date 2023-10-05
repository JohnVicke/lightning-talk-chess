import { createRedis } from "./create-redis";

const redis = createRedis();

type SessionKey = `session-${string}`;

export interface Session {
  accessToken: string;
  expiresAt: number;
  profileId: string;
  refreshToken: string;
}

export const Session = {
  get: async (key: SessionKey) => {
    return redis.get<Session>(key);
  },
  set: async (key: SessionKey, value: Session) => {
    return redis.set(key, value);
  },
};
