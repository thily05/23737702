import React from 'react';
import { Text, TextProps } from 'react-native';
import { FONTS } from '@constants/theme';

interface TypographyProps extends TextProps {
    variant?: keyof typeof FONTS;
    color?: string;
    children: React.ReactNode;
}

export default function Typography({
    variant = 'regular',
    color = '#134E4A',
    style,
    children,
    ...props
}: TypographyProps) {
    return (
        <Text
            style={[{ fontSize: FONTS[variant], color }, style]}
            {...props}
        >
            {children}
        </Text>
    );
}