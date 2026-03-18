import Loader from "./Loader";
import styles from "./SpinnerSkeleton.module.css";

function SpinnerSkeleton() {
  return (
    <div className={styles.SpinnerSkeleton}>
      <Loader />
    </div>
  );
}

export default SpinnerSkeleton;
