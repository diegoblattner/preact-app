import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { getUserById } from '../service';
import { Placeholder } from '../../Placeholder/component';
import appStyle from '../../style.css';
import style from './style.css';

class Author extends Component {
  async componentDidMount() {
    const { userId } = this.props;
    const result = await getUserById(userId);

    this.setState({
      ...result,
    });
  }

  static loadingCard() {
    return (
      <div className={style.author}>
        {[1, 2, 3].map(x => (
          <Placeholder
            style={{ height: '1rem', width: '50%', marginBottom: '0.25rem' }}
          />
        ))}
      </div>
    );
  }

  render() {
    const { name, email, company } = this.state;
    if (!name) {
      return Author.loadingCard();
    }

    return (
      <div className={`${style.author} ${appStyle.fadein}`}>
        By <strong>{name}</strong>
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <span>{company.name}</span>
      </div>
    );
  }
}

Author.propTypes = {
  userId: PropTypes.number.isRequired,
};

export { Author };
