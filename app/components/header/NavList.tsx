'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { navListData } from '../../data/NavListData';
import { NavListItems } from './NavListItems';
import styles from '@styles/page.module.css';

export function NavList() {
  const pathname = usePathname();

  return (
    <ul className={styles.navList}>
      {navListData.map((nav) => {
        const isActive = pathname === nav.link;
        return (
          <NavListItems
            key={nav.id}
            nav={nav}
            activeClass={isActive ? styles.activeNav : ''}
          />
        );
      })}
    </ul>
  );
}
