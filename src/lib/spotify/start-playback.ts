import { createSearchParams } from "utils/create-search-params";
import { SPOTIFY_BASE_URL } from "./constants";

interface StartPlaybackOptions {
  accessToken: string;
  deviceId?: string;
}

export async function startPlayback(options: StartPlaybackOptions) {
  const params =
    options.deviceId &&
    createSearchParams({
      device_id: options.deviceId,
    }).toString();

  const res = await fetch(
    `${SPOTIFY_BASE_URL}/me/player/play?${params ? params.toString() : ""}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res;
}
