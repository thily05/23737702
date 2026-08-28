import { PRICE_MULTIPLIER } from '@constants/student';

export type CategoryId = 'all' | 'food' | 'drink' | 'study';

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: CategoryId;
    description: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products?limit=8');
    if (!res.ok) {
        throw new Error('Network error');
    }
    const data = await res.json();

    return data.map((item: any) => {
        let cat: CategoryId = 'food';
        if (item.category.includes('clothing')) {
            cat = 'study';
        } else if (item.category.includes('jewel')) {
            cat = 'drink';
        }

        return {
            id: item.id,
            title: item.title,
            price: Math.round(item.price * PRICE_MULTIPLIER),
            image: item.image,
            category: cat,
            description: item.description,
        };
    });
};