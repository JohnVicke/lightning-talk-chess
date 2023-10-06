import type { Session } from "lib/upstash/session";
import { SPOTIFY_BASE_URL } from "./constants";

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
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

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  name?: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface Item {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: LinkedFrom;
  name: string;
  popularity: number;
  preview_url: string;
  restrictions: Restrictions;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Restrictions {
  reason: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalIDS {
  ean: string;
  isrc: string;
  upc: string;
}

export interface LinkedFrom {}

interface GetPlaylistByIdOptions {
  playlistId: string;
  session: Session;
}

export async function getPlaylistById(options: GetPlaylistByIdOptions) {
  const res = await fetch(
    `${SPOTIFY_BASE_URL}/${options.session.profileId}/playlists/${options.playlistId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${options.session.accessToken}` },
    },
  );

  return res.json() as Promise<Playlist>;
}
