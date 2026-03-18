import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.skeletonHeader}></div>
      <div className={styles.skeletonTextFull}></div>
      <div className={styles.skeletonTextMedium}></div>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTextShort}></div>
    </div>
  );
}

export default Spinner;
