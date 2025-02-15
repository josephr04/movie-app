import React from 'react';
import { NavListItems } from './NavListItems';
import { navListData } from '../../data/NavListData';
import { Search } from 'lucide-react';
import styles from '../../page.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <h1 className={styles.logo}>Movies+</h1>
      </a>
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