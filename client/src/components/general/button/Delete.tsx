import { useState } from 'react';
import styles from './delete.module.css';

export const Button = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = async () => {
    setIsDeleting(true);
    // const res = await deleteUser )
    setIsDeleting(false);
    setIsDeleted(true);
    setTimeout(() => setIsDeleted(false), 2000);
  };
  return (
    <button
      onClick={handleClick}
      className={isDeleting || isDeleted ? styles.deleting : ''}
      disabled={isDeleting || isDeleted}
    >
      <span className={styles.buttonText}>
        {isDeleting || isDeleted ? 'Deleting' : 'Delete'}
      </span>
      <span className={styles.animation}>
        <span className={styles.balls}></span>
        <span className={styles.lid}></span>
        <span className={styles.can}>
          <span className={styles.filler}></span>
        </span>
      </span>
    </button>
  );
};
