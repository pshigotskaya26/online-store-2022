export enum keysParamsFilter {
    search = "search",
    category = "category",
    brand = "brand",
    price = "price",
    stock = "stock"
}

export interface FilterParams {
    category: string[],
    brand: string[],
    price: [number, number] | [],
    stock: [number, number] | [],
    search: string
}

export interface FilterParamSetter {
    key: keysParamsFilter,
    keyHelper?: string | null
    value: string
}

