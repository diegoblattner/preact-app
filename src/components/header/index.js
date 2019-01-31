import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header className={style.header}>
    <h1 className={style.header__title}>Preact App</h1>
  </header>
);

export default Header;
