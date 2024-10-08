import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto
export const AuthContext = createContext();

// Crear el provider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    // Cargar el email desde AsyncStorage cuando la app se inicie
    useEffect(() => {
        const loadEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    setIsLoggedIn(storedEmail);  // Establecer el email si existe
                }
            } catch (error) {
                console.error("Error al cargar el email", error);
            }
        };

        loadEmail();  // Cargar email al iniciar la aplicación
    }, []);

    // Guardar el email en AsyncStorage al iniciar sesión
    const login = async (email) => {
        try {
            await AsyncStorage.setItem('userEmail', email);  // Guardar el email
            setIsLoggedIn(email);  // Actualizar el estado
        } catch (error) {
            console.error("Error al guardar el email", error);
        }
    };

    // Eliminar el email de AsyncStorage al cerrar sesión
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userEmail');  // Eliminar el email de AsyncStorage
            setIsLoggedIn(null);  // Limpiar el estado
        } catch (error) {
            console.error("Error al eliminar el email", error);
        }
    };

    // Proveer el estado y las funciones a los componentes hijos
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
