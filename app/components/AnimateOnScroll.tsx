"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./../page.module.css";

interface AnimateOnScrollProps {
  children: React.ReactNode;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children }) => {
  const fadeInRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains(styles.fadeInVisible)) {
          entry.target.classList.add(styles.fadeInVisible);
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.05,
    });

    if (fadeInRef.current) {
      observer.observe(fadeInRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={fadeInRef} className={styles.fadeIn}>
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
