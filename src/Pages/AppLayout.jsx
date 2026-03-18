import Map from "../Components/Map";
import Sidebar from "../Components/sidebar";
import User from "../Components/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
