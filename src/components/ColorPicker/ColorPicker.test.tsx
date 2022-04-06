import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ColorPicker from './ColorPicker';

Enzyme.configure({ adapter: new Adapter() });

const colors = ['123', '234', '345'];

const onChange = (color: string) => {
  console.log(color);
};

describe('ColorPicker', () => {
  it('should color pick', () => {
    const component = mount(
      <ColorPicker
        colors={colors}
        currentColor={colors[0]}
        onChange={onChange}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
