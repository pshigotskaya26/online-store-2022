import PageContent from "./index.html"
import defaultState from "../../components/state/state";
import {generateURL} from "../../utils/generateURL";
import {ProductInterface} from "../../types/Product";
import {FilterParams} from "../../types/FilterParams";
import { ProductItem } from "../../components/view/productItem";

class ProductsPage {
    private container: HTMLElement;
    private products: ProductInterface[];
    private filteredProducts: ProductInterface[];
    private FilterParams:  FilterParams;

    constructor(id: string, products: ProductInterface[]) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;
        //Наверное вынести в контроллер
        this.products = products
        this.filteredProducts = []
        this.FilterParams = {
            brand: [],
            color: [],
            year: [],
            searchQuery: ""
        }
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("template");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")

        let filterd = "filterComponent node el"
        let list = document.createElement("div")

        let generatedProducts = this.products
            .map((product: ProductInterface) => new ProductItem(product))
            .map((product: ProductItem) => product.render())
            .join('');

        template.innerHTML = PageContent;

        let productsNode: HTMLElement | null = template.content.querySelector('.products');

        if (productsNode) {
            productsNode.innerHTML = generatedProducts;
        }

        // Временно создан массив
        // let data: PRo[] = productsData
        // console.log(data)

        // Следать 2 компонента
        // Filter
        // Products List

        return template.content.firstChild as HTMLElement;
    }


    private enableFilterProducts() {
        this.container.addEventListener("input", (e: Event) => {
            let target = e.target as HTMLInputElement;
            let category = target.getAttribute("name");
            let value = target.getAttribute("value");
            if (target.checked) {
                // @ts-ignore
                defaultState.filterParams[category].push(value)
            } else {
                // @ts-ignore
                defaultState.filterParams[category] = defaultState.filterParams[category].filter(n => n !== value)
            }
            //
            let newURL = generateURL(defaultState.filterParams)
            // window.location.hash = "products/" + newURL
            window.history.pushState({}, "", "/#products" + newURL);
        })
    }

    render() {
        const title = this.createHeaderTitle("Products1 Page")
        const content = this.createContentPage()
        const container = document.createElement("div")
        container.classList.add("container")
        container.append(title)
        container.append(content)
        this.container.append(container)
        this.enableFilterProducts()
        return this.container
    }
}

export default ProductsPage;