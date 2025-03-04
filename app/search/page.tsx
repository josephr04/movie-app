'use client'

import { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../page.module.css";
import { SearchResults } from "../components/SearchResults";

export default function Page() {  
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    endAdornment={
                        searchTerm && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchTerm("")} edge="end">
                                    <CloseIcon sx={{ color: "white", fontSize: 30 }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
            </div>
            <div>
                <SearchResults searchTerm={debouncedSearch}/>
            </div>
        </div>
    );
}
