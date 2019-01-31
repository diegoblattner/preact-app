import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { getPostById } from '../service';
import { Author } from '../../users/Author/component';
import { Comments } from '../Comments/component';
import { Placeholder } from '../../Placeholder/component';
import appStyle from '../../style.css';
import style from './style.css';

const LoadingPlaceholder = () => (
  <article>
    <Placeholder className={style.image} />
    <div className={style.post}>
      <h1 className={style.post__title}>
        <Placeholder style={{ height: '1.75rem' }} />
      </h1>
      <p className={style.post__body}>
        <Placeholder style={{ height: '6rem' }} />
      </p>
    </div>
  </article>
);

class PostDetails extends Component {
  constructor() {
    super();

    // resets the scroll to the top of the page
    window.scroll(0, 0);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { postId } = this.props;

    const result = await getPostById(postId);

    this.setState({
      ...result,
      loading: false,
    });
  }

  render() {
    const { id, title, body, userId, loading } = this.state;

    if (loading) {
      return LoadingPlaceholder();
    }

    return (
      <article className={`${appStyle.fadein}`}>
        <img
          className={style.image}
          src={`https://picsum.photos/${window.outerWidth}/150?image=${id}`}
          alt={id}
        />
        <div className={style.post}>
          <h1 className={style.post__title}>{title}</h1>
          <p className={style.post__body}>{body}</p>
        </div>
        <Author userId={userId} />
        <Comments postId={id} />
      </article>
    );
  }
}

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};

export { PostDetails };
