'use client'

import { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '@styles/page.module.css';
import { SearchMovies } from '@components/movies/SearchMovies';

export default function Page() {  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDebouncedSearch("");

    if (!searchTerm) {
      setLoading(false);
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <Input 
          placeholder="Search..."  
          sx={{ width: 800, color: 'white', fontSize: 40 }} 
          className={styles.searchInput} 
          value={searchTerm} 
          onChange={(e) => { setSearchTerm(e.target.value); setLoading(true);}}
          endAdornment={
            searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => { setSearchTerm(""); setLoading(false);}} edge="end">
                  <CloseIcon sx={{ color: "white", fontSize: 30 }} />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </div>
      <div>
        {!searchTerm && (
          <div className={styles.searchLoading}>
            <h2>Type something to search...</h2>
          </div>
        )}
        {debouncedSearch && (
          <SearchMovies name={debouncedSearch} setLoading={setLoading} />
        )}
        {loading && (
          <div className={styles.searchLoading}>
            <CircularProgress color="inherit" size={50}/>
          </div>
        )}
      </div>
    </div>
  );
}
