import { memo, useContext } from "react";
import { Avatar, Card } from "antd";
import styles from "./index.module.css";
import tracks from "../../tracks";
import { TrackContext } from "../Player";
import { PlayCircleOutlined } from "@ant-design/icons";

const MusicList = () => {
  const { currentTrackIndex, handleChangeTrack } = useContext(TrackContext);

  const tracksList = tracks.map((track, index) => {
    return (
      <div
        className={styles.music_card}
        key={index}
        onClick={() => {
          handleChangeTrack({ type: "index", indexId: index });
        }}
      >
        <Avatar
          src={
            currentTrackIndex === index ? <PlayCircleOutlined /> : track.image
          }
          shape="square"
          size={40}
        />
        <p>{track.title}</p>
      </div>
    );
  });
  return (
    <Card
      className={styles.music_list_container}
      classNames={{ body: styles.music_list_body }}
    >
      {tracksList}
    </Card>
  );
};

export default memo(MusicList);
