import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import debounce from 'debounce';

const pageSize = 10;
const offsetRatio = 2;

// document.body.offsetHeight === viewport height
// document.body.scrollHeight === current total screen height (scroll height added)
// window.scrollY === current scroll position. Max is document.body.scrollHeight - document.body.offsetHeight

const onOffsetReached = fn => () => {
  if (
    document.body.scrollHeight - window.scrollY <
    document.body.offsetHeight * offsetRatio
  ) {
    window.requestAnimationFrame(fn);
  }
};

class List extends Component {
  constructor(props) {
    super(props);

    const { currentPage = 1, items } = this.props;

    this.state = List.getPageItems({
      visibleItems: [],
      allItems: items,
      showLoadingPlaceholder: false,
      currentPage,
    });
  }

  componentDidMount() {
    this.onScroll = debounce(
      onOffsetReached(
        () => {
          this.setState(List.getNextPage(this.state));
        },
        200,
        600,
      ),
    );
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { items } = this.props;
    const { currentPage } = this.state;

    return nextProps.items !== items || currentPage !== nextState.currentPage;
  }

  static getDerivedStateFromProps(nextProps, prevSate) {
    if (nextProps.items !== prevSate.allItems) {
      return List.getPageItems({
        ...prevSate,
        allItems: nextProps.items,
      });
    }

    return null;
  }

  static getPageItems(state) {
    const { allItems = [], currentPage = 1 } = state;

    const newVisibleItems = allItems.slice(0, currentPage * pageSize);
    const showLoadingPlaceholder =
      newVisibleItems.length + pageSize <= allItems.length;

    return {
      visibleItems: newVisibleItems,
      allItems,
      showLoadingPlaceholder,
      currentPage,
    };
  }

  static getNextPage(state) {
    const { allItems, visibleItems, currentPage } = state;

    if (visibleItems.length < allItems.length) {
      return List.getPageItems({
        ...state,
        currentPage: currentPage + 1,
      });
    }

    return state;
  }

  render() {
    const {
      renderItem,
      listClass = '',
      listItemClass = '',
      loadingCard,
    } = this.props;
    const { visibleItems, showLoadingPlaceholder } = this.state;

    return (
      <ul className={listClass}>
        {visibleItems.map(renderItem).map(({ key, C }) => (
          <li key={key} className={listItemClass}>
            {C}
          </li>
        ))}
        {loadingCard && showLoadingPlaceholder && loadingCard}
      </ul>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  listClass: PropTypes.string,
  listItemClass: PropTypes.string,
  loadingCard: PropTypes.element,
};

export { List };
