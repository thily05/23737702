import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface ShopInputProps extends TextInputProps {
    error?: boolean;
}

export default function ShopInput({ error, style, ...props }: ShopInputProps) {
    return (
        <TextInput
            style={[
                styles.input,
                { borderColor: error ? '#DC2626' : '#CCFBF1' },
                style,
            ]}
            placeholderTextColor="#5F7A77"
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        color: '#134E4A',
    },
});