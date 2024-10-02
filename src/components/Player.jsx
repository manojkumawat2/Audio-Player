import AudioPlayer from "./AudioPlayer";
import tracks from "../tracks";
import { createContext, useState } from "react";

export const TrackContext = createContext({});

const Player = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Change the track
  const handleChangeTrack = (action) => {
    switch (action) {
      case "next": {
        setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
        break;
      }
      case "prev": {
        setCurrentTrackIndex(
          currentTrackIndex - 1 < 0 ? tracks.length - 1 : currentTrackIndex - 1
        );
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <TrackContext.Provider
      value={{
        handleChangeTrack,
        currentTrackIndex,
      }}
    >
      <AudioPlayer track={tracks[currentTrackIndex]} />
    </TrackContext.Provider>
  );
};

export default Player;
