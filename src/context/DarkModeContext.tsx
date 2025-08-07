"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
    children: ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        // Check for stored preference first
        const storedPreference = localStorage.getItem("theme");

        let prefersDarkMode: boolean;

        if (storedPreference) {
            // Use stored preference if available
            prefersDarkMode = storedPreference === "dark";
        } else {
            // Use system preference as default
            prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Store the system preference
            localStorage.setItem("theme", prefersDarkMode ? "dark" : "light");
        }

        setIsDarkMode(prefersDarkMode);

        // Apply theme immediately to prevent flash
        if (prefersDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        document.documentElement.style.overflowY = 'auto';
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newValue = !prev;
            localStorage.setItem("theme", newValue ? "dark" : "light");
            document.documentElement.classList.toggle("dark", newValue);
            return newValue;
        });
    };

    if (isDarkMode === null) {
        return null;
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
