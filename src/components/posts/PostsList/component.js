import { h } from 'preact';
import { ListBase, states } from '../../list/base';
import { List } from '../../GenericList/component';
import { PostCard } from '../PostCard/component';
import appStyle from '../../style.css';
import style from './style.css';

class PostsList extends ListBase {}

const renderItem = item => ({ key: item.id, C: <PostCard data={item} /> });

PostsList.prototype[states.loading] = function loading() {
  return (
    <ul className={`${appStyle.fadein} ${style.list}`}>
      {PostCard.loadingCard()}
      {PostCard.loadingCard()}
    </ul>
  );
};
PostsList.prototype[states.empty] = function empty() {
  return <div>No data is available</div>;
};
PostsList.prototype[states.loaded] = function loaded(items) {
  return (
    <List
      items={items}
      renderItem={renderItem}
      listClass={`${appStyle.fadein} ${style.list}`}
      listItemClass={style.list__item}
      loadingCard={PostCard.loadingCard()}
    />
  );
};

export { PostsList };
