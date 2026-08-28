import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { Typography } from './Typography';

interface ShopInputProps extends TextInputProps {
    error?: boolean;
    label?: string;
}

export const ShopInput = ({ error, label, ...props }: ShopInputProps) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {label && <Typography>{label}</Typography>}
            <TextInput
                style={[
                    styles.input,
                    { color: colors.text, borderColor: error ? colors.error : colors.border, backgroundColor: colors.surface }
                ]}
                placeholderTextColor={colors.textLight}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 8 },
    input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
});