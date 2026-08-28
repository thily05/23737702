import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { FONTS } from '@constants/theme';

interface TypographyProps extends TextProps { variant?: keyof typeof FONTS; color?: string; children: React.ReactNode; }
export const Typography = ({ variant = 'body', color, style, children, numberOfLines, ...props }: TypographyProps) => {
    const { colors } = useTheme();
    return <Text numberOfLines={numberOfLines} style={[FONTS[variant], { color: color || colors.text }, style]} {...props}>{children}</Text>;
};