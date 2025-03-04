import { SearchMovies } from "./SearchMovies"
import styles from '../page.module.css';

type SearchResultsProps = {
    searchTerm: string;
};

export function SearchResults({ searchTerm } : SearchResultsProps) {

    return (
        <div>
        {!searchTerm ? (
            <h2>Type something to search...</h2>
        ) : (
            <div>
                <SearchMovies name={searchTerm}/>
            </div>
        )}
        </div>
    );
}