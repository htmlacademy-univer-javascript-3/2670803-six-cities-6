import { FC } from 'react';
import { useAppDispatch } from '../Store';
import { setError } from '../Store/offers/offer-slice';
import styles from './error-message.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setError(null));
  };

  return (
    <div className={styles.errorMessage}>
      <div className={styles.errorMessageContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <p className={styles.errorText}>{message}</p>
        <button
          className={styles.errorMessageClose}
          type="button"
          aria-label="Close error message"
          onClick={handleClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
