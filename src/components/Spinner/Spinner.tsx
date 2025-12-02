import { FC } from 'react';
import styles from './spinner.module.css';

interface SpinnerProps {
  text?: string;
}

const Spinner: FC<SpinnerProps> = ({ text = 'Loading...' }) => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.text}>{text}</p>
  </div>
);

export default Spinner;
