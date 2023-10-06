import { useEffect, useState } from "preact/hooks";

interface PlayerProps {
  accessToken: string;
}

export default function Player(props: PlayerProps) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };

    return () => {
      player?.removeListener("ready");
      player?.removeListener("not_ready");
      player?.disconnect();
    };
  }, []);

  if (!player) {
    return <div>Not Ready</div>;
  }

  return (
    <div className="sticky bottom-0 w-full bg-red-200">
      <button onClick={() => void player.togglePlay()}>play</button>
      <h1>Player</h1>
    </div>
  );
}
