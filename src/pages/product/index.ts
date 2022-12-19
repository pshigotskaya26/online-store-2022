import {ProductInterface} from "../../types/Product";
import PageContent from "./index.html"

class ProductPage {
    private container: HTMLElement;
    idElem?: string
    product: ProductInterface | {};

    constructor(idTag: string, idElem: string) {
        this.container = document.createElement("div");
        this.container.id = idTag
        this.idElem = idElem
        this.product = {}
        this.getProductInfo()
    }

    getProductInfo() {
        return {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            "images": ["https://i.dummyjson.com/data/products/1/1.jpg", "https://i.dummyjson.com/data/products/1/2.jpg", "https://i.dummyjson.com/data/products/1/3.jpg", "https://i.dummyjson.com/data/products/1/4.jpg", "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
        }
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        // id element  `${this.idElem ?? this.idElem}`
        let template: HTMLTemplateElement = document.createElement("template");
        template.innerHTML = PageContent
        // <HTMLImageElement>template.content.querySelector("#image")?.src = "https://i.dummyjson.com/data/products/1/thumbnail.jpg"

        return <HTMLDivElement>template.content.firstChild
    }

    render() {
        const title = this.createHeaderTitle("Product Page")
        this.container.append(title)
        const content = this.createContentPage()
        this.container.append(content)
        return this.container
    }
}

export default ProductPage;