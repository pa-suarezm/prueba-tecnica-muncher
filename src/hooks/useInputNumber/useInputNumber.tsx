import { useState } from 'react';

const useInputNumber = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    set: (new_value: any) => setValue(new_value),
    reset: () => setValue(0),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};

export default useInputNumber;
