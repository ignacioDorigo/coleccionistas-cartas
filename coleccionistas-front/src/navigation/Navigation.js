import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "context/AuthContext";
import { ThemeProvider } from "context/ThemeContext";
import AuthStack from "navigation/AuthStack";
import Tabs from "navigation/Tabs";
import { RecargarProvider } from "../context/RecargarContext";

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <Tabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export function App() {
  return (
    <RecargarProvider>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </RecargarProvider>
  );
}

export default Navigation;
