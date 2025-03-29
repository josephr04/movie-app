"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import IconButton from '@mui/material/IconButton';
import { Ripple } from 'primereact/ripple';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@styles/page.module.css';

interface Review {
  id: string;
  username: string;
  name: string;
  avatar_path: string;
  content: string;
}

export function ReviewItem({ review }: { review: Review }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className={`${styles.reviewCard} p-ripple`} onClick={() => setIsOpen(true)}>
        <div className={styles.userProfile}>
          <img  className={styles.avatar} src={review.avatar_path ? `https://image.tmdb.org/t/p/w500/${review.avatar_path}` : "/assets/default-avatar.png"} alt={review.username} />
          <div className={styles.userNames}>
            <h1>{review.username || "Anonymous"}</h1>
            <h2>{review.name}</h2>
          </div>
        </div>
        <div className={styles.reviewContent}>
          <p>{review.content}</p>
        </div>
        <Ripple />
      </div>

      {/* Modal */}
      {mounted && createPortal(
        <div className={`${styles.modalBackdrop} ${isOpen ? styles.active : ""}`} onClick={() => setIsOpen(false)}>
          <div className={`${styles.modalCard} ${isOpen ? styles.active : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalUserProfile}>
              <div className={styles.modalUserInfo}>
                <img  className={styles.avatar} src={review.avatar_path ? `https://image.tmdb.org/t/p/w500/${review.avatar_path}` : "/assets/default-avatar.png"} alt={review.username} />
                <div className={styles.userNames}>
                  <h1>{review.username || "Anonymous"}</h1>
                  <h2>{review.name}</h2>
                </div>
              </div>
              <IconButton onClick={() => setIsOpen(false)} className={styles.closeButton}>
                <CloseIcon sx={{ color: "white", fontSize: 18 }} />
              </IconButton>          
            </div>
            <div className={styles.modalContent}>
              <p>{review.content}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
