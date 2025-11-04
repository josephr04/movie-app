import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page not found</h1>
      <Link href="/">Return to Home</Link>
    </div>
  );
}