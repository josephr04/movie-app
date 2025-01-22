import React from 'react';
import { NavListItems } from './components/header/NavListItems';
import { navListData } from './data/NavListData';
import { Search } from 'lucide-react';
import styles from './page.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Movies+</h1>
      <ul className={styles.nav}>
        {
          navListData.map(nav => (
            <NavListItems key={nav.id} nav={nav} />
          ))
        }
      </ul>
      <a href="" className={styles.search}>
        <Search />
      </a>
    </header>
  )
}

export default Header