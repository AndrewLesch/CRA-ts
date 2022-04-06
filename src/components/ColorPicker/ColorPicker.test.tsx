import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ColorPicker from './ColorPicker';

Enzyme.configure({ adapter: new Adapter() });

describe('ColorPicker Test', () => {
  const colors: Array<string> = ['#dfb6b6', '#c3dfb6', '#dfd4b6'];
  let pickedColor: string = 'color2';

  const onChange = (color: string): void => {
    pickedColor = color;
  };
  let colorPickerMountedElement: ReactWrapper;

  beforeEach(() => {
    colorPickerMountedElement = mount(
      <ColorPicker
        colors={colors}
        currentColor={colors[1]}
        onChange={onChange}
      />
    );
  });

  it('should match snapshot', () => {
    expect(colorPickerMountedElement).toMatchSnapshot();
  });

  it('should have buttons for all color', () => {
    const button: ReactWrapper = colorPickerMountedElement.find('button');
    expect(button).toHaveLength(colors.length);
  });

  it('should changing color', () => {
    const button: ReactWrapper = colorPickerMountedElement
      .find('.color-button')
      .first();
    button.simulate('click');
    expect(pickedColor).toEqual(colors[0]);
  });
});
