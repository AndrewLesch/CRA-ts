import React from 'react';

import './ColorPicker.css';

type ColorPickerProps = {
  colors: Array<string>;
  currentColor: string;
  onChange(color: string): void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  currentColor,
  onChange,
}) => (
  <div className="color-container">
    {colors.map((color) => (
      <button
        type="button"
        key={color}
        onClick={() => onChange(color)}
        className={`color-button ${
          currentColor === color ? 'color-button--selected' : ''
        }`}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

export default ColorPicker;
