import React, { memo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

// Xóa import tĩnh COLORS, chỉ lấy FONTS
import { FONTS } from '@constants/theme';
// Thêm useTheme để hỗ trợ Dark Mode
import { useTheme } from '@contexts/ThemeContext';

type TypographyVariant =
    | 'title'
    | 'subtitle'
    | 'body'
    | 'button'
    | 'caption';

type TypographyProps = TextProps & {
    variant?: TypographyVariant;
    color?: string;
    children: React.ReactNode;
};

const Typography = ({
    variant = 'body',
    color,
    children,
    style,
    ...props
}: TypographyProps) => {
    // Lấy bộ màu động (sẽ tự động thay đổi khi đổi theme)
    const { colors } = useTheme();

    // Nếu người dùng không truyền màu cụ thể, tự động dùng màu text của theme
    const textColor = color || colors.text;

    return (
        <Text
            {...props}
            style={[
                styles.base,
                FONTS[variant as keyof typeof FONTS], // Đảm bảo FONTS trong theme.ts của bạn có đủ các key này
                { color: textColor },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        includeFontPadding: false,
    },
});

export default memo(Typography);