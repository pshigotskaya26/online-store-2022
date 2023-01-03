import Controller from "../../controller/controller";
import {ProductInterface} from "../../../types/Product";
import {ProductItem} from "../productItem";
import {ModesViewKeys} from "../modeViewProductsList";

export class ProductsList {
    controller: Controller;
    root: HTMLElement;
    filteredProducts: ProductInterface[];
    products: HTMLDivElement;
    modeView: ModesViewKeys;

    constructor(controller: Controller) {
        this.controller = controller;
        this.modeView = this.controller.getCurrentView()
        this.root = document.createElement("div");
        this.root.classList.add("catalog__products")
        this.products = document.createElement("div")
        this.products.classList.add("products")

        this.filteredProducts = this.controller.getFilteredProducts()
    }

    render(): HTMLElement {
        this.root.innerHTML = ""
        this.modeView = this.controller.getCurrentView()
        this.root.classList.add(this.modeView)
        if (!this.filteredProducts.length) {
            let nothing = document.createElement("div")
            nothing.textContent = "Ничего нет"
            this.products.append(nothing)
        }
        this.filteredProducts.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)

        return this.root
    }

    update() {
        this.products.innerHTML = ""
        let filteredArray = this.controller.getFilteredProducts()
        console.log(filteredArray)
        this.root.className = "catalog__products"
        this.modeView = this.controller.getCurrentView()
        this.root.classList.add(this.modeView)

        if (!filteredArray.length) {
            let nothing = document.createElement("div")
            nothing.textContent = "Ничего нет"
            this.products.append(nothing)
        }

        filteredArray.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)
    }

}

export default ProductsList;