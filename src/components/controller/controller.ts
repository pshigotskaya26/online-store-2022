import {ProductInterface} from "../../types/Product";
import {productsData} from "../../data/products";


class Controller {
    products: ProductInterface[];
    filteredProducts: ProductInterface[];

    constructor() {
        this.products = productsData
        this.filteredProducts = []
    }



    getProduct(id: string | number): ProductInterface {
        return this.products.filter(n => n.id.toString() === id.toString())[0]
    }
}

export default Controller