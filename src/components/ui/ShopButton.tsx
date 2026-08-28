import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Typography from './Typography';

interface ShopButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
}

export default function ShopButton({
    title,
    onPress,
    isLoading,
    variant = 'primary',
    disabled,
}: ShopButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <Pressable
            style={[
                styles.button,
                isPrimary ? styles.primaryBg : styles.outlineBg,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#0F766E'} />
            ) : (
                <Typography
                    variant="regular"
                    color={isPrimary ? '#FFFFFF' : '#0F766E'}
                    style={styles.text}
                >
                    {title}
                </Typography>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#0F766E',
    },
    primaryBg: {
        backgroundColor: '#0F766E',
    },
    outlineBg: {
        backgroundColor: 'transparent',
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        fontWeight: '600',
    },
});