import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ColorPicker from './ColorPicker';

Enzyme.configure({ adapter: new Adapter() });

describe('ColorPicker Test', () => {
  const colors: Array<string> = ['color1', 'color2', 'color3'];
  let pickedColor: string = 'color2';

  const onChange = (color: string): void => {
    pickedColor = color;
  };
  let component: ReactWrapper;

  beforeEach(() => {
    component = mount(
      <ColorPicker
        colors={colors}
        currentColor={colors[1]}
        onChange={onChange}
      />
    );
  });

  it('test mounting ColorPicker', () => {
    expect(component).toMatchSnapshot();
  });

  it('test presence of buttins', () => {
    const button: ReactWrapper = component.find('button');
    expect(button).toHaveLength(3);
  });

  it('first button click test', () => {
    const btn: ReactWrapper = component.find('.color-button').first();
    btn.simulate('click');
    expect(pickedColor).toEqual('color1');
  });
});
