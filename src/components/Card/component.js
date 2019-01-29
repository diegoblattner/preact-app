import { h, Component } from 'preact';
import style from './style';

class Card extends Component {
  constructor(props) {
    super(props);
    const { className } = this.props;
    this.props.className = className || '';
  }

  render({ className }) {
    return (
      <div className={`${style.card} ${className}`}>{this.props.children}</div>
    );
  }
}

export { Card };
