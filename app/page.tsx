import { Suspense } from "react";
import { Banner } from "./components/home/banner";
import { Loading } from "./components/Loading";
import { CardCarousel } from "./components/home/CardCarousel"
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <main>
      <Suspense fallback={<Loading />}>
        <Banner/>
      </Suspense>
      <div className={styles.cardSection}>
        <CardCarousel title="Now Playing" category="now_playing"/>
        <CardCarousel title="Popular" category="popular"/>
        <CardCarousel title="Top Rated" category="top_rated"/>
        <CardCarousel title="Upcoming" category="upcoming"/>
      </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
