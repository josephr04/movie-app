import Link from 'next/link';
import React from 'react';
import { NavItems } from '@/app/data/NavListData';
import styles from '@styles/page.module.css';
import { Ripple } from 'primereact/ripple';

interface NavListItemsProps {
  nav: NavItems;
  activeClass: string;
}

export function NavListItems({ nav, activeClass }: NavListItemsProps) {
  return (
    <Link href={nav.link} passHref>
      <li className={`${styles.navListItems} ${activeClass} p-ripple`}>
        {nav.name}
        <Ripple />
      </li>
    </Link>
  );
}
