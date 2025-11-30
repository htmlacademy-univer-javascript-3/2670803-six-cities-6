import { FC } from 'react';
import './spinner.css';

const Spinner: FC = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading offers...</p>
  </div>
);

export default Spinner;
