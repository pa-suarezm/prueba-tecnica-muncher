import { useState } from 'react';

const useInputText = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    set: (new_value: any) => setValue(new_value),
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};

export default useInputText;
