import { memo, useContext, useEffect, useRef, useState } from "react";
import { Avatar, Card, Input, Slider } from "antd";
import styles from "./index.module.css";
import AudioControls from "./AudioControls";
import { TrackContext } from "../Player";
import tracks from "../../tracks";

const AudioPlayer = () => {
  const { currentTrackIndex, handleChangeTrack } = useContext(TrackContext);
  const track = tracks[currentTrackIndex];

  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const audioRef = useRef(new Audio(track.src));
  const intervalRef = useRef(null);
  const isReady = useRef(false);

  const duration = isNaN(audioRef.current.duration)
    ? 0
    : audioRef.current.duration;

  // Start the timer
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // Do something
      } else {
        setTimer(audioRef.current.currentTime);
      }
    }, 1000);
  };

  // Start/Pause Song
  const handleStartOrPauseSong = () => {
    if (isRunning) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      startTimer();
    }
    setIsRunning(!isRunning);
  };

  // Handle forward
  const handleTimeForward = (event) => {
    const time = event.target.value;

    setTimer(event.target.value);
    audioRef.current.currentTime = time;
  };

  // Handle next play
  const handleNextPlay = () => {
    handleChangeTrack({ type: "next" });
  };

  // Handle prev play
  const handlePrevPlay = () => {
    handleChangeTrack({ type: "prev" });
  };

  const getTime = (seconds) => {
    return `${Math.floor(seconds / 60)} : ${Math.floor(seconds % 60)}`;
  };

  useEffect(() => {
    console.log(currentTrackIndex);
    audioRef.current.pause();

    audioRef.current = new Audio(track.src);

    setTimer(audioRef.current.currentTime);

    if (isReady.current) {
      console.log("Running");
      audioRef.current.play();
      setIsRunning(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <Card
        className={styles.music_player_container}
        classNames={{ body: styles.music_player_body }}
      >
        <Avatar src={track.image} size={150} />

        <div className={styles.music_title_container}>
          <p className={styles.music_title}>{track.title}</p>
        </div>

        <AudioControls
          handleStartOrPauseSong={handleStartOrPauseSong}
          handleNextPlay={handleNextPlay}
          handlePrevPlay={handlePrevPlay}
          isRunning={isRunning}
        />

        <Input
          type="range"
          min={0}
          max={duration}
          value={timer}
          onChange={handleTimeForward}
        />

        <div>
          {getTime(timer)} / {getTime(duration)}
        </div>
      </Card>
    </>
  );
};

AudioPlayer.propTypes = {};

export default memo(AudioPlayer);
