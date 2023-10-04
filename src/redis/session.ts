import { createRedis } from "./create-redis";

const redis = createRedis();

type SessionKey = `session-${string}`;

interface Session {
  profileId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const Session = {
  get: async (key: SessionKey) => {
    return redis.get<Session>(key);
  },
  set: async (key: SessionKey, value: Session) => {
    return redis.set(key, value);
  },
};
