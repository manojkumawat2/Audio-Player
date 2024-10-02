import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { Button } from "antd";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

const AudioControls = ({
  handleStartOrPauseSong,
  isRunning,
  handleNextPlay,
  handlePrevPlay,
}) => {
  return (
    <div className={styles.music_controller_container}>
      <Button
        color={"#bfbfbf"}
        shape="circle"
        size="large"
        className={styles.music_controller_btn}
        onClick={handlePrevPlay}
      >
        <StepBackwardOutlined />
      </Button>
      <Button
        color={"#bfbfbf"}
        shape="circle"
        size="large"
        className={styles.music_controller_btn}
        onClick={handleStartOrPauseSong}
      >
        {isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      </Button>
      <Button
        color={"#bfbfbf"}
        shape="circle"
        size="large"
        className={styles.music_controller_btn}
        onClick={handleNextPlay}
      >
        <StepForwardOutlined />
      </Button>
    </div>
  );
};

AudioControls.propTypes = {
  handleStartOrPauseSong: PropTypes.func,
  handleNextPlay: PropTypes.func,
  handlePrevPlay: PropTypes.func,
  isRunning: PropTypes.bool,
};

export default memo(AudioControls);
