import { h, Component } from 'preact';
import { route } from 'preact-router';
import PropTypes from 'prop-types';
import { PostDetails } from '../../components/posts/Details/component';
import appStyle from '../../components/style.css';
import style from './style.css';

const allPosts = '< All posts';
const goBack = () => {
  if (window.history.length) {
    window.history.back();
  } else {
    route('/');
  }
};

const Post = ({ postId }) => (
  <div className={appStyle.fadeinloading}>
    <button className={style.back} onClick={goBack}>
      {allPosts}
    </button>
    <PostDetails postId={postId} />
  </div>
);

Post.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Post;
