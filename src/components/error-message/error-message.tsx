import { FC, useCallback } from 'react';
import { useAppDispatch } from '../Store';
import { setError } from '../Store/offers/offer-slice';
import styles from './error-message.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  return (
    <div className={styles.errorMessage}>
      <div className={styles.errorMessageContent}>
        <p>{message}</p>
        <button className={styles.errorMessageClose} onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
