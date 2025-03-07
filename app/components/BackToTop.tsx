"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from '../page.module.css';

export function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button 
      className={`${styles.backToTop} ${showButton ? styles.show : styles.hide}`} 
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp />
    </button>
  );
}
