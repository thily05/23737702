import React, { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// Bỏ ngoặc nhọn đi vì Typography của bạn đang dùng export default
import Typography from './Typography';
import { useTheme } from '@contexts/ThemeContext';

type ShopInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label?: string;
    error?: string | boolean;
};

const ShopInput = ({
    value,
    onChangeText,
    placeholder,
    label,
    error,
}: ShopInputProps) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {label && (
                <Typography
                    variant="caption"
                    style={styles.label}
                >
                    {label}
                </Typography>
            )}

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textLight}
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.surface,
                        borderColor: error ? colors.error : colors.border,
                    }
                ]}
            />

            {typeof error === 'string' && (
                <Typography
                    variant="caption"
                    color={colors.error}
                >
                    {error}
                </Typography>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
});

export default memo(ShopInput);