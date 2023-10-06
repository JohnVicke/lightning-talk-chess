import { atom } from "nanostores";

export const $spotifyPlayer = atom<typeof Spotify | null>(null);

export function setSpotifyPlayer(player: typeof Spotify | null) {
  $spotifyPlayer.set(player);
}
