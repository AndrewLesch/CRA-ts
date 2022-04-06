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
  let ColorPickerComponent: ReactWrapper;

  beforeEach(() => {
    ColorPickerComponent = mount(
      <ColorPicker
        colors={colors}
        currentColor={colors[1]}
        onChange={onChange}
      />
    );
  });

  it('test mounting ColorPickerComponent', () => {
    expect(ColorPickerComponent).toMatchSnapshot();
  });

  it('test presence of buttons', () => {
    const button: ReactWrapper = ColorPickerComponent.find('button');
    expect(button).toHaveLength(3);
  });

  it('first button click test', () => {
    const button: ReactWrapper =
      ColorPickerComponent.find('.color-button').first();
    button.simulate('click');
    expect(pickedColor).toEqual('color1');
  });
});
