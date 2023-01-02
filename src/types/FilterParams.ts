export enum keysParamsFilter {
    brands = "brands",
    categories = "categories",
    prices = "prices",
    stocks = "stocks",
    search = "search",
}

export interface FilterParams {
    categories: string[],
    brands: string[],
    prices: [number, number] | [],
    stocks: [number, number] | [],
    search: string,
}


export interface FilterParamSetter {
    key: keyof FilterParams,
    keyHelper?: string | null
    value: string
}

