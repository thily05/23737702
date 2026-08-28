import React, { memo } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
} from 'react-native';

import Typography from './Typography';
import { COLORS, SIZES } from '@constants/theme';

type Props = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'outline';
};

const ShopButton = ({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    variant = 'primary',
}: Props) => {
    const isDisabled = disabled || isLoading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={[
                styles.base,
                variant === 'primary'
                    ? styles.primary
                    : styles.outline,
                isDisabled && styles.disabled,
            ]}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={
                        variant === 'primary'
                            ? COLORS.surface
                            : COLORS.primary
                    }
                />
            ) : (
                <Typography
                    variant="button"
                    color={
                        variant === 'primary'
                            ? COLORS.surface
                            : COLORS.primary
                    }
                >
                    {title}
                </Typography>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        minHeight: 44,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.lg,
    },

    primary: {
        backgroundColor: COLORS.primary,
    },

    outline: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,
    },

    disabled: {
        opacity: 0.5,
    },
});

export default memo(ShopButton);