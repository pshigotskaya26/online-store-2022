import {ProductInterface} from "../../types/Product";
import PageTemplate from "./index.html"

class ProductPage {
    private container: HTMLElement;
    product: ProductInterface | {};

    constructor(idTag: string, product: ProductInterface | {}) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.product = product
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template: HTMLTemplateElement = document.createElement("template");
        // Вынести во view

        template.innerHTML = PageTemplate;
        let image: HTMLImageElement | null = template.content.querySelector("#image")
        if (image) {
            image.src = this.product.images[0]
        }
        return <HTMLDivElement>template.content.firstChild
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
}

export default ProductPage;