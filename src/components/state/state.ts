import Products from "../../pages/products";
import {FilterParams} from "../../types/FilterParams";
import {ProductInterface} from "../../types/Product";
import {productsData} from "../../data/products";

interface StateInterface {
    products: ProductInterface[],
    filterParams: FilterParams,
    filteredProducts: Products[],
    cart: Products[],
}

const defaultState: StateInterface = {
    products: productsData,
    filterParams: {
        brand: [],
        color: [],
        year: [],
        searchQuery: ""
    },
    filteredProducts: [],
    cart: []
}

export default defaultState