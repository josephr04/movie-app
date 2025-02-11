"use client";

import React, { useEffect, useRef } from "react";
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
