import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import UploadButton from './UploadButton';

configure({ adapter: new Adapter() });

describe('Upload Button', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<UploadButton onButtonClick={() => null} />);
  });

  it('should render successfully', () => {
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.type()).toEqual('a');
  });

  it('when click button', () => {
    const mockFn = jest.fn();
    wrapper.setProps({ onButtonClick: mockFn });
    expect(mockFn.mock.calls.length).toEqual(0);
    wrapper
      .find('a')
      .at(0)
      .simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
