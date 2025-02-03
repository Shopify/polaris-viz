import {mount} from '@shopify/react-testing';

import {DefaultPreview} from '../DefaultPreview';

describe('<DefaultPreview/>', () => {
  it('renders a div with a background color', () => {
    const actual = mount(<DefaultPreview color="rgb(222, 54, 24)" />);

    expect(actual).toContainReactComponent('span', {
      style: {
        background: 'rgb(222, 54, 24)',
        height: 8,
        width: 8,
      },
    });
  });
});
