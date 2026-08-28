import React, {
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

import {
    COLORS,
    DARK_COLORS,
} from '@constants/theme';

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
    colors: typeof COLORS;
};

const ThemeContext =
    createContext<ThemeContextType | undefined>(
        undefined,
    );

export const ThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const colors = useMemo(
        () => ({
            ...COLORS,
            ...(isDark ? DARK_COLORS : {}),
        }),
        [isDark],
    );

    const value = useMemo(
        () => ({
            isDark,
            toggleTheme,
            colors,
        }),
        [isDark, colors],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme must be used inside ThemeProvider',
        );
    }

    return context;
};