import { useState } from 'react';
import './styles.css';

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
      className={isDeleting || isDeleted ? 'deleting' : ''}
      disabled={isDeleting || isDeleted}
    >
      <span className='button-text'>
        {isDeleting || isDeleted ? 'Deleting' : 'Delete'}
      </span>
      <span className='animation'>
        <span className='balls'></span>
        <span className='lid'></span>
        <span className='can'>
          <span className='filler'></span>
        </span>
      </span>
    </button>
  );
};
