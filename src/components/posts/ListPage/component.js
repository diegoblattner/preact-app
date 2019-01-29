import { h, Component } from 'preact';
import Header from '../../header';
import { FilterBar } from '../../list/filter-bar/component';
import { PostsList } from '../PostsList/component';
import { listPosts } from '../service';
import style from './style';

class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      promise: listPosts()
    };
  }

  render() {
    const { promise } = this.state;
    return (
      <div className={style.container}>
        <Header />
        <FilterBar promise={promise} />
        <PostsList promise={promise} />
      </div>
    );
  }
}

export { ListPage };
