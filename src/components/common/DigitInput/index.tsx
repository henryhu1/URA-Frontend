import React, { useRef, useEffect, ChangeEvent } from 'react';

const DigitInput = ({
  index,
  focus,
  onValueChange,
  onKeyDown,
}: DigitInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue && onValueChange) {
      onValueChange(inputValue, index);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      size={1}
      maxLength={1}
      onChange={(e) => handleChange(e)}
      min={0}
      max={9}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e.key, index)}
      style={{ width: '20px', textAlign: 'center' }}
    />
  );
};

type DigitInputProps = {
  index: number,
  focus: boolean,
  onValueChange: (value: string, index: number) => void,
  onKeyDown: (keyName: string, index: number) => void,
}

export default DigitInput;
