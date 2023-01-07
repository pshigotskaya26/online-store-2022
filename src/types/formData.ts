import {CountedProduct, RangeCounterProducts} from "./Product";

export interface FormData {
    brands: CountedProduct[],
    categories: CountedProduct[],
    prices: RangeCounterProducts,
    stocks: RangeCounterProducts,
    search: string
}