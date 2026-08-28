export type CategoryId =
    | 'all'
    | 'food'
    | 'drink'
    | 'study';

export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

const API_URL =
    'https://fakestoreapi.com/products?limit=8';

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('FETCH_PRODUCTS_FAILED');
    }

    const data = await response.json();

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
    }));
}