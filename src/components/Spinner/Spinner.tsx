import { FC } from 'react';
import styles from './spinner.module.css';

interface SpinnerProps {
  text?: string;
}

const DEFAULT_LOADING_TEXT = 'Loading...';

const Spinner: FC<SpinnerProps> = ({ text = DEFAULT_LOADING_TEXT }) => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.text}>{text}</p>
  </div>
);

export default Spinner;
