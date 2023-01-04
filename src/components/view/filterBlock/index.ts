import FilterProducts from "../filterProducts";
import Controller from "../../controller/controller";

export class FilterBlock {
    root: HTMLElement;
    filterProducts: FilterProducts
    controller: Controller
    formWrapper: HTMLDivElement

    constructor(root: HTMLElement, controller: Controller, private updateProductsList: () => void) {
        this.root = root
        this.controller = controller
        this.formWrapper = document.createElement("div")
        this.filterProducts = new FilterProducts(controller, this.formWrapper, this.updateProductsList)
        let data = this.controller.getDataForForm()
        this.filterProducts.render(data)
    }

    render(): HTMLElement {
        this.root.classList.add("filters")
        let title = document.createElement("h2")
        title.classList.add("filters__title")
        title.textContent = "Параметры"
        this.root.append(title)

        this.root.append(this.formWrapper)
        return this.root
    }

}

export default FilterBlock;