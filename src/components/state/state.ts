import Products from "../../pages/products";
import {FilterParams} from "../../types/FilterParams";
import {Product} from "../../types/Product";

interface StateInterface {
    products: Product[],
    filterParams: FilterParams,
    filteredProducts: Products[],
    cart: Products[],
}

const defaultState: StateInterface = {
    products: [],
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