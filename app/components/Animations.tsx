"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/page.module.css";

interface FadeInOnScrollProps {
  children: React.ReactNode;
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ children }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInVisible);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={styles.fadeIn}>
      {children}
    </div>
  );
};

interface DynamicHeaderProps {
  children: React.ReactNode;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : styles.headerTransparent}`}>
      {children}
    </header>
  );
};
