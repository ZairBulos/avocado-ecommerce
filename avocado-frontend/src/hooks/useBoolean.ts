import { useState } from "react";

export const useBoolean = (initialState = false) => {
  const [isTrue, setIsTrue] = useState<boolean>(initialState);

  const onToggle = () => {
    setIsTrue(!isTrue);
  };

  return { 
    isTrue, 
    onToggle 
  };
};
