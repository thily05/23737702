import React, { useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
} from 'react-native';
import { STUDENT, examStamp, VARIANT, FLASH_SECONDS, BANNER_IMAGE_ID } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useTheme } from '@contexts/ThemeContext';
import { useCountdown } from '@hooks/useCountdown';
import { fetchProducts, Product, CategoryId } from '@services/productApi';

import Typography from '@components/ui/Typography';
import ShopInput from '@components/ui/ShopInput';
import ShopButton from '@components/ui/ShopButton';

export default function HomeScreen() {
    const { theme, toggleTheme } = useTheme();
    const currentColors = COLORS[theme];
    const timeLeft = useCountdown(FLASH_SECONDS);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, dispatchQuantity] = useReducer((state: number, action: 'ADD' | 'REMOVE') => {
        if (action === 'ADD') return state + 1;
        if (action === 'REMOVE') return state > 1 ? state - 1 : 1;
        return state;
    }, 1);

    const loadProducts = async () => {
        setLoading(true);
        setError(false);
        let isAlive = true;
        try {
            const data = await fetchProducts();
            if (isAlive) {
                setProducts(data);
                setLoading(false);
            }
        } catch (err) {
            if (isAlive) {
                setError(true);
                setLoading(false);
            }
        }
        return () => {
            isAlive = false;
        };
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const categories: { id: CategoryId; label: string }[] = useMemo(() => {
        const list = [
            { id: 'all' as CategoryId, label: 'Tất cả' },
            { id: 'food' as CategoryId, label: 'Đồ ăn' },
            { id: 'drink' as CategoryId, label: 'Nước' },
            { id: 'study' as CategoryId, label: 'Học tập' },
        ];
        return VARIANT.chipsReversed ? list.reverse() : list;
    }, []);

    const handleOpenModal = useCallback((item: Product) => {
        setSelectedProduct(item);
    }, []);

    const handleConfirmOrder = () => {
        if (!selectedProduct) return;
        Alert.alert(
            `CampusMart · ${STUDENT.mssv}`,
            `${STUDENT.hoTen} (#${examStamp()}) đã ghi nhận: ${selectedProduct.title} × ${quantity}. Nhận tại quầy KTX.`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setSelectedProduct(null);
                    },
                },
            ]
        );
    };

    const renderItem = useCallback(({ item }: { item: Product }) => (
        <Pressable
            style={[styles.card, { backgroundColor: currentColors.surface, borderColor: currentColors.border }]}
            onPress={() => handleOpenModal(item)}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="contain" />
            <View style={styles.cardInfo}>
                <Typography variant="title" color={currentColors.text} numberOfLines={1}>
                    {item.title}
                </Typography>
                <Typography variant="regular" color={currentColors.primary}>
                    {item.price.toLocaleString('vi-VN')} đ
                </Typography>
                <Typography variant="small" color={currentColors.textLight}>
                    {item.category === 'food' ? 'Đồ ăn' : item.category === 'drink' ? 'Nước' : 'Học tập'}
                </Typography>
            </View>
            <ShopButton
                title="Đặt"
                onPress={() => handleOpenModal(item)}
                variant="primary"
            />
        </Pressable>
    ), [currentColors, handleOpenModal]);

    const headerComponent = (
        <View>
            <View style={[styles.headerBar, { backgroundColor: currentColors.surface, borderColor: currentColors.border }]}>
                <View>
                    <Typography variant="title" color={currentColors.primary}>
                        CAMPUSMART
                    </Typography>
                    <Typography variant="small" color={currentColors.textLight}>
                        Tiện lợi KTX
                    </Typography>
                </View>
                <View style={styles.headerRight}>
                    <Typography variant="small" color={currentColors.secondary}>
                        Flash {formatTime(timeLeft)}
                    </Typography>
                    <Pressable onPress={toggleTheme} style={[styles.themePressable, { borderColor: currentColors.primary }]}>
                        <Typography variant="small" color={currentColors.primary}>
                            {theme === 'light' ? 'Tối' : 'Sáng'}
                        </Typography>
                    </Pressable>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <ShopInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={`Tìm món, nước, đồ dùng — ${STUDENT.mssv}`}
                />
            </View>

            <View style={styles.bannerContainer}>
                <Image
                    source={{ uri: `https://picsum.photos/id/${BANNER_IMAGE_ID}/800/320` }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
                <View style={styles.bannerOverlay}>
                    <Typography variant="title" color="#FFF">
                        Đặt nhanh · Nhận tại quầy
                    </Typography>
                    <Typography variant="small" color="#FFF">
                        Cửa hàng tiện lợi ký túc xá 24/7
                    </Typography>
                </View>
            </View>

            <View style={styles.chipsContainer}>
                {categories.map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                        <Pressable
                            key={cat.id}
                            style={[
                                styles.chip,
                                {
                                    backgroundColor: isSelected ? currentColors.primary : currentColors.surface,
                                    borderColor: currentColors.primary,
                                },
                            ]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            <Typography
                                variant="regular"
                                color={isSelected ? '#FFFFFF' : currentColors.primary}
                            >
                                {cat.label}
                            </Typography>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );

    const watermarkComponent = (
        <View style={styles.watermarkContainer}>
            <Typography variant="small" color={currentColors.textLight}>
                TH1 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Typography>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            {VARIANT.watermarkAtTop && watermarkComponent}

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={currentColors.primary} />
                    <Typography variant="regular" color={currentColors.text}>
                        Đang tải món…
                    </Typography>
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Typography variant="title" color={currentColors.error}>
                        {STUDENT.mssv}
                    </Typography>
                    <Typography variant="regular" color={currentColors.text}>
                        Không tải được dữ liệu món.
                    </Typography>
                    <ShopButton title="Thử lại" onPress={loadProducts} variant="primary" />
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={item => `${STUDENT.mssv}-${item.id}`}
                    renderItem={renderItem}
                    ListHeaderComponent={headerComponent}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Typography variant="regular" color={currentColors.textLight}>
                                Không có món phù hợp
                            </Typography>
                        </View>
                    }
                />
            )}

            {!VARIANT.watermarkAtTop && watermarkComponent}

            {selectedProduct && (
                <Modal
                    visible={true}
                    transparent={true}
                    animationType={VARIANT.modalAnimation}
                    onRequestClose={() => setSelectedProduct(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: currentColors.surface }]}>
                            <Typography variant="small" color={currentColors.textLight} style={styles.modalStamp}>
                                TH1 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
                            </Typography>

                            <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} resizeMode="contain" />
                            <Typography variant="title" color={currentColors.text}>
                                {selectedProduct.title}
                            </Typography>
                            <Typography variant="regular" color={currentColors.primary}>
                                {selectedProduct.price.toLocaleString('vi-VN')} đ
                            </Typography>
                            <Typography variant="small" color={currentColors.textLight}>
                                Danh mục: {selectedProduct.category}
                            </Typography>
                            <Typography variant="small" color={currentColors.textLight} numberOfLines={2} style={styles.modalDesc}>
                                {selectedProduct.description}
                            </Typography>

                            <View style={styles.counterContainer}>
                                <Pressable
                                    style={[styles.counterBtn, { borderColor: currentColors.border }]}
                                    onPress={() => dispatchQuantity('REMOVE')}
                                >
                                    <Typography variant="title" color={currentColors.text}>-</Typography>
                                </Pressable>
                                <Typography variant="title" color={currentColors.text}>
                                    {quantity}
                                </Typography>
                                <Pressable
                                    style={[styles.counterBtn, { borderColor: currentColors.border }]}
                                    onPress={() => dispatchQuantity('ADD')}
                                >
                                    <Typography variant="title" color={currentColors.text}>+</Typography>
                                </Pressable>
                            </View>

                            <ShopButton
                                title={timeLeft <= 0 ? "Hết giờ flash-sale" : "Xác nhận đặt"}
                                onPress={handleConfirmOrder}
                                variant="primary"
                                disabled={timeLeft <= 0}
                            />
                            <ShopButton
                                title="Đóng"
                                onPress={() => setSelectedProduct(null)}
                                variant="outline"
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    watermarkContainer: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 10,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    themePressable: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 4,
    },
    searchContainer: {
        marginBottom: 10,
    },
    bannerContainer: {
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
    },
    cardImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    cardInfo: {
        flex: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalStamp: {
        marginBottom: 10,
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    modalDesc: {
        textAlign: 'center',
        marginVertical: 8,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 15,
    },
    counterBtn: {
        width: 35,
        height: 35,
        borderRadius: 18,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});