export interface ProductInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}

export interface CountedProduct {
    title: string,
    filteredCount: number,
    count: number,
    selected: boolean
}

export interface RangeCounterProducts {
    min: number,
    max: number,
    minDefault: number,
    maxDefault: number
}