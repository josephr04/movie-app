import { Banner } from "@components/home/banner";
import { CardCarousel } from "@components/home/CardCarousel"
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <Banner/>
      <div className={styles.cardSection}>
        <CardCarousel title="Now Playing" category="now_playing"/>
        <CardCarousel title="Popular" category="popular"/>
        <CardCarousel title="Top Rated" category="top_rated"/>
        <CardCarousel title="Upcoming" category="upcoming"/>
      </div>
    </div>
  );
}
