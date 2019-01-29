import { h, Component } from 'preact';
import style from './style';

class Carousel extends Component {
  render() {
    return <ul className={style.carousel}>{this.props.children}</ul>;
  }
}

class CarouselItem extends Component {
  render() {
    return <li className={style.carousel__item}>{this.props.children}</li>;
  }
}

export { Carousel, CarouselItem };
