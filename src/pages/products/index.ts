import FilterBlock from "../../components/view/filterBlock";
import Controller from "../../components/controller/controller";
import ProductsList from "../../components/view/productsListBlock";


class ProductsPage {
    controller: Controller
    private readonly container: HTMLElement;

    filterBlockHTML: HTMLElement;
    listProductsHTML: HTMLElement
    filterBlock: FilterBlock;
    productsList: ProductsList

    constructor(id: string, controller: Controller) {
        this.controller = controller
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;

        this.filterBlockHTML = document.createElement("div")
        this.filterBlock = new FilterBlock(this.filterBlockHTML, controller, this.updateProductsList)

        this.listProductsHTML = document.createElement("div")
        this.productsList = new ProductsList(this.listProductsHTML, controller)
    }

    private createHeaderTitle(text: string): HTMLHeadElement {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage(): HTMLElement {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")

        mainContainer.append(this.filterBlock.render())
        mainContainer.append(this.productsList.render())

        // this.setActiveToButton();

        template.append(mainContainer)
        return template;
    }

    render() {
        const title = this.createHeaderTitle("Products Page")
        const content = this.createContentPage()
        const container = document.createElement("div")
        container.classList.add("container")
        container.append(title)
        container.append(content)
        this.container.append(container)
        return this.container
    }


    updateProductsList = () => {
        console.log("updateList")
        this.productsList.updateCounterElements()
        this.productsList.productsList.update()
    }

}

export default ProductsPage;