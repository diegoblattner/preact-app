import { h } from 'preact';
import style from './style.css';

const Loading = () => (
  <div className={style.vinil}>
    <div className={style.vinil__label} />
    <div className="vinil--reflex" />
  </div>
);

export { Loading };
