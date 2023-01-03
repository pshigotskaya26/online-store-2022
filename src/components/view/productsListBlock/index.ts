import Controller from "../../controller/controller";
import {ProductInterface} from "../../../types/Product";
import {ModeViewProductsList} from "../modeViewProductsList";
import {SortBy} from "../sortBy";
import ProductsList from "../productsList";

export class ProductsListBlock {
    root: HTMLElement;
    controller: Controller;
    filteredProducts: ProductInterface[];
    modeView: ModeViewProductsList;
    modeSort: SortBy;
    productsList: ProductsList;
    countFoundProducts: HTMLSpanElement;

    constructor(root: HTMLElement, controller: Controller) {
        this.root = root
        this.controller = controller
        this.filteredProducts = this.controller.getFilteredProducts()
        this.countFoundProducts = document.createElement("span")
        this.modeView = new ModeViewProductsList(this.controller, this.handleView)
        this.modeSort = new SortBy(this.controller, this.handleSort)
        this.productsList = new ProductsList(this.controller)
    }

    render(): HTMLElement {
        let catalog = document.createElement("div")
        catalog.classList.add("catalog")
        let catalogTitle = document.createElement("h2")
        catalogTitle.classList.add("catalog__title")
        catalogTitle.textContent = "Каталог"

        let catalogContent = document.createElement("div")

        let catalogSort = document.createElement("div")
        catalogSort.classList.add("catalog__sort")


        catalogSort.append(this.modeView.render())
        catalogSort.append(this.createCountsElementsBlock())
        catalogSort.append(this.modeSort.render())


        catalogContent.append(catalogSort)
        catalogContent.append(this.productsList.render())

        catalog.append(catalogTitle)
        catalog.append(catalogContent)

        return catalog
    }

    handleView = () => this.productsList.update()
    handleSort = () => {
        this.controller.setSortProducts()
        this.productsList.update()
    }


    private createCountsElementsBlock(): HTMLDivElement {
        let countElements = document.createElement("div")
        countElements.classList.add("count-products")
        this.countFoundProducts.classList.add("count-found-products")
        this.countFoundProducts.textContent = String(this.filteredProducts.length)

        countElements.textContent = "Найдено: "
        countElements.append(this.countFoundProducts)

        return countElements
    }

    updateCounterElements() {
        let count = this.controller.getFilteredProducts().length
        this.countFoundProducts.textContent = String(count)
    }
}


export default ProductsListBlock