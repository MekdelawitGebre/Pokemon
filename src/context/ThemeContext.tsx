import React, { createContext, useContext, useEffect, useState } from "react";

// themes
type Theme = "light" | "dark";


interface ThemeContextType {
  theme: Theme; // Current theme state
  toggleTheme: () => void; // Function to toggle the theme
}

// Create the ThemeContext 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component 
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      // Return saved theme 
      return (
        savedTheme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light"; 
  });

  useEffect(() => {
  
    const root = window.document.documentElement;
    root.classList.remove("light", "dark"); 
    root.classList.add(theme); 
    localStorage.setItem("theme", theme); // Save the current theme to localStorage
  }, [theme]); 

  const toggleTheme = () => {
    // Toggle between light and dark theme
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
  
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Render child components */}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context; 
}
