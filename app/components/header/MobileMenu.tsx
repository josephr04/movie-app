'use client'

import { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavList } from './NavList';
import styles from '@styles/page.module.css';

export function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <>
      <div className={`${styles.menuIcon} ${menuOpen ? `${styles.menuIconActive}` : ``}`}>
        <MenuIcon sx={{fontSize: 32 }} onClick={toggleMenu}/>
      </div>

      <div ref={menuRef}  className={`${styles.mobileMenu} ${menuOpen ? `${styles.mobileMenuOpen}` : `${styles.mobileMenuClosed}`}`}>
        <div className={styles.menuSection}>
          <NavList />
        </div>
      </div>
    </>
  )
}

