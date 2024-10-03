import AudioPlayer from "./AudioPlayer";
import tracks from "../tracks";
import { createContext, useState } from "react";
import MusicList from "./MusicList";

export const TrackContext = createContext({});

const Player = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Change the track
  const handleChangeTrack = (action) => {
    switch (action.type) {
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
      case "index": {
        setCurrentTrackIndex(action.indexId);
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
      <AudioPlayer />

      <MusicList />
    </TrackContext.Provider>
  );
};

export default Player;
