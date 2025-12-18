import { FC, useEffect, useState } from 'react';
import styles from './spinner.module.css';

interface SpinnerProps {
  text?: string;
  isLoading: boolean;
  minDuration?: number;
}

const DEFAULT_LOADING_TEXT = 'Loading';
const DEFAULT_MIN_DURATION = 1500;

const Spinner: FC<SpinnerProps> = ({
  text = DEFAULT_LOADING_TEXT,
  isLoading,
  minDuration = DEFAULT_MIN_DURATION,
}) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    let isMounted = true;

    if (isLoading) {
      setIsVisible(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsVisible(false);
      }
    }, minDuration);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isLoading, minDuration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wave}>
        <span />
        <span />
        <span />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Spinner;
