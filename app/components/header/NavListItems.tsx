import React from 'react'
import { NavItems } from '@/app/data/NavListData';
import styles from '../../page.module.css';

interface NavListItemsProps {
  nav: NavItems;
}

export function NavListItems({ nav }: NavListItemsProps) {
  return (
    <li className={styles.nav}>
      <a href={nav.link} className={styles['nav-link']}>{nav.name}</a>
    </li>
  )
}