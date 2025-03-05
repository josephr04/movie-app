export async function getMovies(page: number) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
    throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    return data.results;
}