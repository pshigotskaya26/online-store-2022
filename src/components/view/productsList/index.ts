import Controller from "../../controller/controller";
import {ProductInterface} from "../../../types/Product";
import {ProductItem} from "../productItem";

export class ProductsList {
    controller: Controller;
    root: HTMLElement;
    filteredProducts: ProductInterface[];
    products: HTMLDivElement;

    constructor(controller: Controller) {
        this.root = document.createElement("div");
        this.root.classList.add("catalog__products");
        this.products = document.createElement("div")
        this.products.classList.add("products")
        this.controller = controller;
        this.filteredProducts = this.controller.getFilteredProducts()
    }


    render(): HTMLElement {
        this.root.innerHTML = ""


        this.filteredProducts.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)

        return this.root
    }

    update() {
        this.products.innerHTML = ""
        let filteredArray = this.controller.getFilteredProducts()
        filteredArray.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)
    }

}

export default ProductsList;