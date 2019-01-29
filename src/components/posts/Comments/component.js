import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { getPostComments } from '../service';
import { List } from '../../GenericList/component';
import { Card } from '../../Card/component';
import { Placeholder } from '../../Placeholder/component';
import style from './style';

const renderComment = comment => ({
  key: comment.id,
  C: (
    <Card className={style.comment}>
      <strong>{comment.name}</strong>
      <br />
      {comment.body}
      <br />
      <a className={style.comment__email} href={`mailto:${comment.email}`}>
        {comment.email}
      </a>
    </Card>
  )
});

const loadingCard = () => (
  <Card className={style.comment}>
    <Placeholder style={{ height: '1rem', marginBottom: '0.5rem' }} />
    <Placeholder style={{ height: '5rem' }} />
  </Card>
);

class Comments extends Component {
  async componentDidMount() {
    const { postId } = this.props;

    const result = await getPostComments(postId);
    this.setState({
      comments: result || []
    });
  }

  render() {
    const { comments = [] } = this.state;

    return (
      <section className={style.comments}>
        <h2 className={style.comments__title}>{comments.length} comments</h2>
        <List
          listClass={style.comments__list}
          items={comments}
          renderItem={renderComment}
          loadingCard={loadingCard()}
        />
      </section>
    );
  }
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired
};

export { Comments };
