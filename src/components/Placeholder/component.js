import { h } from 'preact';
import style from './style';

const Placeholder = ({ className = '', ...props }) => {
  return <div className={`${style.placeholder} ${className}`} {...props} />;
};

export { Placeholder };
