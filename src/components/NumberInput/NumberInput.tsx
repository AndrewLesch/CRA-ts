import React, { useEffect, useState } from 'react';

import './NumberInput.css';

type NumberInputProps = {
  value: number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange(value: number): void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value,
  disabled,
  className,
  placeholder,
  required,
  min,
  max,
  step,
}) => {
  const [localValue, setLocalValue] = useState<string>(`${value}`);

  useEffect(() => {
    setLocalValue(`${value}`);
  }, [value]);

  const onChangeWrapper = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let val: string = event.target.value;

    if (val.length > 1 && !val.startsWith('0.1')) {
      val = val.replace(/^0+/, '');
    }

    const dotIndex: number = val.indexOf('.');
    if (dotIndex >= 0 && val.length - dotIndex > 3) {
      val = val.substring(0, dotIndex + 3);
    }
    setLocalValue(`${val}`);
  };

  const onBlurValue = (event: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    const dotIndex: number = inputValue.indexOf('.');

    if (inputValue.length > 1 && dotIndex === 0) {
      onChange(+`0${inputValue}`);
    }
    onChange(+`${inputValue}`);
  };

  return (
    <input
      disabled={disabled}
      value={localValue}
      className={`number-input ${className !== undefined ? className : ''}`}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      type="number"
      step={step}
      onChange={onChangeWrapper}
      onBlur={onBlurValue}
    />
  );
};

export default NumberInput;
