// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';
import Header from '../src/components/header';

describe('Initial Test of the Header', () => {
  test('Header renders with correct title', () => {
    const context = shallow(<Header />);
    expect(context.find('h1').text()).toBe('Preact App');
  });
});
