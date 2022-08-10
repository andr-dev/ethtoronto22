import React from "react";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "./themes";
import useTheme from "./useTheme";

interface ThemeContextProps {
  children?: React.ReactNode;
}

const ThemeContext: React.FC<ThemeContextProps> = ({ children }) => {
  const { theme } = useTheme();

  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default ThemeContext;
