import styles from '@styles/page.module.css';

export function Loading() {
    return (
      <div className={styles.loading}>
        <div className={`d-flex justify-content-center align-items-center`}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
}

export function LoadingItems() {
  return (
    <div className={styles.loadingItems}>
      <div className={`d-flex justify-content-center align-items-center`}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}