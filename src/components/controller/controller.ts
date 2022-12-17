import {Product} from "../../types/Product";
import {productsData} from "../../data/products";

class Controller {
    products: Product[]
    constructor() {
        this.products = productsData
    }
    getProducts() {
        console.log(this.products)
    }
}

export default Controller