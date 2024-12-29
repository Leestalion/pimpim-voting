import styles from './LoadingComponent.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.loadingBar}>
      <div className={styles.loadingBarProgress}></div>
    </div>
  );
};

export default LoadingComponent;