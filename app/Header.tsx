import React from 'react';
import { NavListItems } from './components/header/NavListItems';
import { navListData } from './data/NavListData';
import { Search } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/cinema-logo.png"
        width={128}
        height={52}
        alt="Cinema Logo"
        className=''
      />
      <ul className='nav'>
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