/**
 * All components list related use the same data,
 * this is an abstraction to handle the data in only one place
 * and resolve the same statuses for all the components
 * (loading, empty, loaded)
 */
import { h, Component } from 'preact';
import PropTypes from 'prop-types';

const states = {
  loading: 'loading',
  empty: 'empty',
  loaded: 'loaded',
};

const getInitialState = () => ({
  listState: states.loading,
  items: [],
});

class ListBase extends Component {
  constructor() {
    super();
    this.state = getInitialState();
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps) {
    const { promise } = this.props;

    if (prevProps.promise !== promise) {
      this.setState(getInitialState());
      this.updateData();
    }
  }

  updateData() {
    const { promise } = this.props;

    promise.then(resolvedData => {
      this.setState({
        listState: resolvedData.length > 0 ? states.loaded : states.empty,
        items: resolvedData,
      });
    });
  }

  render() {
    const { listState, items } = this.state;
    return this[listState](items);
  }
}

ListBase.propTypes = {
  promise: PropTypes.instanceOf(Promise).isRequired,
};

export { ListBase, states };
