import React from 'react';
import slugify from "slugify";
import { CardCarousel } from "../../components/home/CardCarousel";
import { Banner } from "../../components/home/banner";
import { notFound } from "next/navigation";
import styles from '../../page.module.css';

interface PageProps {
    params: {
        slug: string;
    };
}

interface Genre {
    id: number;
    name: string;
}

async function getGenres(): Promise<Genre[]> { // ✅ Explicit return type
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error("Failed to fetch genres");
    }

    return (await res.json()).genres as Genre[];
}

export default async function Page({ params }: PageProps) {
    const genres = await getGenres();

    const matchedGenre = genres.find(
        (genre: Genre) => slugify(genre.name, { lower: true }) === params.slug
    );

    if (!matchedGenre) {
        notFound();
    }

    const genreTitle = matchedGenre.name;
    const genreId = matchedGenre.id;

    return (
        <div>
            <Banner genreId={genreId}/>
            <div className={styles.cardSection}>
                <CardCarousel title={<>New Releases <span className={styles.genreTitle}>{genreTitle}</span></>} category="primary_release_date" genreId={genreId}/>
                <CardCarousel title={<>Popular <span className={styles.genreTitle}>{genreTitle}</span></>} category="popularity" genreId={genreId}/>
                <CardCarousel title={<>Original Title <span className={styles.genreTitle}>{genreTitle}</span></>} category="original_title" genreId={genreId}/>
            </div>
        </div>
    );
}
