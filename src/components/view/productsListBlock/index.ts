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

    constructor(root: HTMLElement, controller: Controller) {
        this.root = root
        this.controller = controller
        this.filteredProducts = this.controller.getFilteredProducts()
        this.modeView = new ModeViewProductsList(this.controller)
        this.modeSort = new SortBy(this.controller)
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
        catalogSort.append(this.modeSort.render())


        catalogContent.append(catalogSort)
        catalogContent.append(this.productsList.render())

        catalog.append(catalogTitle)
        catalog.append(catalogContent)

        return catalog
    }


}


export default ProductsListBlock