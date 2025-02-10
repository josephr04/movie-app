import styles from '../page.module.css';
import Image from 'next/image';
import { FaGithub } from "react-icons/fa";

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.tmdb}>
                <h6>Data provided by</h6>
                <a href="https://www.themoviedb.org" target='_blank' rel="noopener noreferrer">
                    <Image src="/assets/tmdb-logo.png" alt="TMDB Logo" width={40} height={32}/>
                </a>
            </div>
            <h6>This project uses the TMDB API but is not endorsed or certified by TMDB.</h6>
            <a href="https://github.com/josephr04/movie-app" target="_blank" rel="noopener noreferrer">
                <FaGithub className={styles.contactIcon} size={34}/>
            </a>
        </div>
    );
}