import { useEffect, useState } from "react";
import { Theme } from "../types/theme";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as Theme);
    }
  }, []);

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
