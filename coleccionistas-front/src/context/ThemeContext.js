import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(systemColorScheme === "dark");

  useEffect(() => {
    console.log("System color scheme: ", systemColorScheme);
    setIsDarkTheme(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    setIsDarkTheme(systemColorScheme === "dark");
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
