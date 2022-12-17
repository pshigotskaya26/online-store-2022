import PageContent from "./index.html"
import {Product} from "../../types/Product";
import defaultState from "../../components/state/state";

class ProductsPage {
    products: Product[];
    filteredProducts: Product[] | [];
    private container: HTMLElement;
    constructor(id: string) {
        this.container = document.createElement("div");
        this.container.id = id
        this.products = []
        this.filteredProducts = []
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        // createFilter()
        // createProductsList()

        let template = document.createElement("template");
        template.innerHTML = PageContent;
        return template.content.firstChild as HTMLElement;
    }
    private enableFilterProducts() {
        this.container.addEventListener("input", (e: Event) => {
            let target = e.target as HTMLInputElement
            let category = target.getAttribute("name");
            let value = target.getAttribute("value");
            // @ts-ignore
            defaultState.filterParams[category].push(value)
            // @ts-ignore
            console.log( defaultState.filterParams[category] )

        })
    }

    render() {
        const title = this.createHeaderTitle("Products Page")
        const content = this.createContentPage()

        this.container.append(title)
        this.container.append(content)
        this.enableFilterProducts()

        return this.container
    }
}

export default ProductsPage;