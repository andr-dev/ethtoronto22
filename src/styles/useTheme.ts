import { useEffect, useState } from "react";

const useTheme = (): { theme: string; themeToggler: () => void } => {
  const [theme, setTheme] = useState("dark");

  const setMode = (mode: string): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = (): void => (theme === "dark" ? setMode("light") : setMode("dark"));

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return { theme, themeToggler };
};

export default useTheme;
