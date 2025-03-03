import Input from '@mui/material/Input';
import styles from "../page.module.css";

export default async function Page() {  
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchHeader}>
                <Input placeholder="Search..."  sx={{ width: 800, color: 'white', fontSize: 40 }} className={styles.searchInput}/>
            </div>
        </div>
    );
  }
  