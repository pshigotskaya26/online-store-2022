export enum keysParamsFilter {
    search = "search",
    category = "category",
    brand = "brand",
    price = "price",
    discountPercentage = "discountPercentage"
}

export interface FilterParams {
    category: string[],
    brand: string[],
    price: [number, number] | [],
    discountPercentage: [number, number] | [],
    search: string
}

