import { CardCarousel } from "../../components/home/CardCarousel"

async function getGenreName(genreId: number): Promise<string> {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching genres: ${response.statusText}`);
        }

        const data = await response.json();
        //console.log("value and type of genderId: ", genreId, " ", typeof(genreId));

        if (!data.genres) {
            throw new Error("Genres not found in API response");
        }

        const genre = data.genres.find((g: { id: number }) => g.id === genreId);
        return genre ? genre.name : "Unknown Genre";
    } catch (error) {
        console.error("Error fetching genre:", error);
        return "Unknown Genre";
    }
}

interface CategoryPageProps {
    params: {
        genreId: number;
    };
}

export default async function Page({ params }: CategoryPageProps) {
    console.log("Params received:", params);

    const { genreId } = params;
    const genreTitle = await getGenreName(genreId);

    return (
        <div>
            <h1>Category: {genreTitle}</h1>
            <CardCarousel title={`Now Playing ${genreTitle}`} category="now_playing" genreId={genreId}/>
            <CardCarousel title={`Popular ${genreTitle}`} category="popular" genreId={genreId}/>
            <CardCarousel title={`Top Rated ${genreTitle}`} category="top_rated" genreId={genreId}/>
            <CardCarousel title={`Upcoming ${genreTitle}`} category="upcoming" genreId={genreId}/>
        </div>
    );
}