import {ProductInterface} from "../../types/Product";
import PageTemplate from "./index.html"

class ProductPage {
    private container: HTMLElement;
    product: ProductInterface;

    constructor(idTag: string, product: ProductInterface) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.product = product
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = this.product.title;
        return headerTitle;
    }

    private createContentPage() {
        let template: HTMLTemplateElement = document.createElement("template");
        // Вынести во view

        template.innerHTML = PageTemplate;
        let image: HTMLImageElement | null = template.content.querySelector("#image");
        let title: HTMLImageElement | null = template.content.querySelector(".title");
        if (image) {
            image.src = this.product.thumbnail
        }
        if (title) {
            title.innerText = this.product.thumbnail
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