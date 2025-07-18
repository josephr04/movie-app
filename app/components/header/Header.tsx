import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { DynamicHeader } from '@components/Animations';
import { NavList } from './NavList';
import { MobileMenu } from './MobileMenu';
import { Ripple } from 'primereact/ripple';
import styles from '@styles/page.module.css';

function Header() {
  return (
    <DynamicHeader>
      <div className={styles.mobileMenuComponent}>
        <MobileMenu />
      </div>
      <Link href="/" className={styles.logoLink} id={styles.test}>
        <h1 className={styles.logo}>Movies+</h1>
      </Link>
      <div className={styles.navListDesk}>
        <NavList />
      </div>
      <Link href="/search" className={`${styles.search} p-ripple`}>
        <Search />
        <Ripple />
      </Link>
    </DynamicHeader>
  );
}

export default Header;
