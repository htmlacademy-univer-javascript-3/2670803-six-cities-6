import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../Store/action';
import styles from './error-message.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setError(null));
  };

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
