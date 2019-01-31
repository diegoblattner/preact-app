import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { route } from 'preact-router';
import { Card } from '../../Card/component';
import { Placeholder } from '../../Placeholder/component';
import style from './style.css';

class PostCard extends Component {
  onSelect() {
    const { data } = this.props;
    route(`/posts/${data.id}`);
  }

  static loadingCard() {
    return (
      <Card>
        <article className={style.item}>
          <Placeholder className={style.title} style={{ height: '1.5rem' }} />
          <Placeholder className={style.thumbnail} />
          <Placeholder
            className={style.body}
            style={{
              height: '85px',
              display: 'inline-block',
              width: 'calc(100% - 96px)',
            }}
          />
        </article>
      </Card>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <Card>
        <article className={style.item} onClick={this.onSelect.bind(this)}>
          <h1 className={style.title}>{data.title}</h1>
          <img
            className={style.thumbnail}
            src={`https://picsum.photos/85/85?image=${data.id}`}
            alt={data.id}
          />
          <p className={style.body}>{data.body}</p>
        </article>
      </Card>
    );
  }
}

PostCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export { PostCard };
