'use client'

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from '@styles/page.module.css';

export function ScrollDown() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    window.scrollBy({
      top: 750,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${styles.scrollContainer} ${!isVisible ? styles.hidden : ""}`}
      onClick={handleScroll}
    >
      <ChevronDown className={styles.scrollDownArrow} size={50} />
    </div>
  );
}
