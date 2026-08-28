import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';

import Typography from '@components/ui/Typography';
import ShopInput from '@components/ui/ShopInput';
import ShopButton from '@components/ui/ShopButton';

import {
    COLORS,
    SIZES,
} from '@constants/theme';

import {
    STUDENT,
    examStamp,
} from '@constants/student';

const HomeScreen = () => {
    const [text, setText] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Typography
                    variant="caption"
                    color={COLORS.textLight}
                >
                    TH1 · {STUDENT.mssv} · {STUDENT.hoTen} · #
                    {examStamp()}
                </Typography>

                <Typography
                    variant="title"
                    color={COLORS.primary}
                    style={styles.logo}
                >
                    CAMPUSMART
                </Typography>

                <Typography
                    variant="body"
                    color={COLORS.textLight}
                >
                    Cửa hàng tiện lợi KTX
                </Typography>

                <View style={styles.demo}>
                    <Typography
                        variant="subtitle"
                        style={styles.sectionTitle}
                    >
                        Bộ UI dùng chung
                    </Typography>

                    <ShopInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Tìm món..."
                        label="Tìm kiếm"
                    />

                    <ShopButton
                        title="Đặt"
                        onPress={() => { }}
                        variant="primary"
                    />

                    <View style={styles.outlineButton}>
                        <ShopButton
                            title="Đóng"
                            onPress={() => { }}
                            variant="outline"
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    container: {
        flex: 1,
        padding: SIZES.lg,
    },

    logo: {
        marginTop: SIZES.lg,
        marginBottom: SIZES.sm,
    },

    demo: {
        marginTop: SIZES.xl,
    },

    sectionTitle: {
        marginBottom: SIZES.md,
    },

    outlineButton: {
        marginTop: SIZES.md,
    },
});

export default HomeScreen;