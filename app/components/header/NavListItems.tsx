'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { NavItems } from '@/app/data/NavListData';
import slugify from 'slugify';
import { Ripple } from 'primereact/ripple';
import styles from '@styles/page.module.css';

interface NavListItemsProps {
  nav: NavItems;
  activeClass: string;
}

export function NavListItems({ nav, activeClass }: NavListItemsProps) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile && nav.subItems) {
      setShowSubMenu((prev) => !prev);
    }
  };

  return (
    <>
      <li className={`${styles.navListItems} ${activeClass} p-ripple`} onClick={handleClick}>
        <Link href={nav.link} passHref>
          {nav.name}
        </Link>
        <Ripple />
      </li>
      {isMobile && showSubMenu && nav.subItems && (
        <ul className={styles.subMenu}>
          {nav.subItems.map((sub) => {
            const slug = slugify(sub.name, { lower: true });
            return (
              <li key={sub.id} className={`${styles.subMenuItem} p-ripple`}>
                <Link href={`/categories/${slug}`}>{sub.name}</Link>
                <Ripple />
              </li>
            )
          })}
        </ul>
      )}
    </>
  );
}
