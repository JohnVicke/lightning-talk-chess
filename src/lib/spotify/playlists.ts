import type { Session } from "lib/upstash/session";
import { createSearchParams } from "utils/createSearchParams";

const base = "https://api.spotify.com/v1/users";

export interface PlaylistResponse {
  href: string;
  items: Playlist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Tracks;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

interface GetPlaylistsOptions {
  session: Session;
  limit?: number;
  offset?: number;
}

export async function getPlaylists(options: GetPlaylistsOptions) {
  const params = createSearchParams({
    limit: options.limit?.toString() ?? "20",
    offset: options.offset?.toString() ?? "0",
  });

  const res = await fetch(
    `${base}/${options.session.profileId}/playlists?${params.toString()}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${options.session.accessToken}` },
    },
  );
  return res.json() as Promise<PlaylistResponse>;
}
