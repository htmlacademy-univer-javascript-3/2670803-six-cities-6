import { FC } from 'react';
import styles from './spinner.module.css';

const Spinner: FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.text}>Loading offers...</p>
  </div>
);

export default Spinner;
