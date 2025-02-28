import Link from 'next/link';
import React from 'react';
import { NavItems } from '@/app/data/NavListData';
import styles from '../../page.module.css';

interface NavListItemsProps {
  nav: NavItems;
  activeClass: string;
}

export function NavListItems({ nav, activeClass }: NavListItemsProps) {
  return (
    <Link href={nav.link} passHref>
      <li className={`${styles.navListItems} ${activeClass}`} style={{ cursor: 'pointer' }}>
        {nav.name}
      </li>
    </Link>
  );
}
