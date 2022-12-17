import Products from "../../pages/products";
import {FilterParams} from "../../types/FilterParams";

interface StateInterface {
    products: Products[],
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