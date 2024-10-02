import { CustomerServiceOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <span className={styles.header_logo}>
        <CustomerServiceOutlined />
        Music Player
      </span>
    </div>
  );
};

export default Header;
