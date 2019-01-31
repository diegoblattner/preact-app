import { h } from 'preact';
import { states, ListBase } from '../base';
import style from './style.css';

const wrapper = C => <div className={style.filter}>{C}</div>;

class FilterBar extends ListBase {}
FilterBar.prototype[states.loading] = function loading() {
  return wrapper('...Loading...');
};
FilterBar.prototype[states.empty] = function empty() {
  return wrapper('No results =(');
};
FilterBar.prototype[states.loaded] = function loaded(items) {
  return wrapper(
    <div>
      Showing {items.length} {items.length > 1 ? 'posts' : 'post'}
    </div>,
  );
};

export { FilterBar };
