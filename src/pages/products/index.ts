import PageContent from "./index.html"
import defaultState from "../../components/state/state";
import {generateURL} from "../../utils/generateURL";
import {ProductInterface} from "../../types/Product";
import {FilterParams} from "../../types/FilterParams";
import Filter from "../../components/view/filter";

class ProductsPage {
    private container: HTMLElement;
    private products: ProductInterface[];
    private filteredProducts: ProductInterface[];
    private filterParams: FilterParams;

    constructor(id: string, products: ProductInterface[]) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;
        //Наверное вынести в контроллер
        this.products = products
        this.filteredProducts = []
        this.filterParams = {
            category: ["automotive", "fragrances", "furniture"],
            brand: ["Apple", "Ghazi Fabric"],
            price: [],
            stock: [],
            search: "Search Value"
        }
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")
        mainContainer.append(this.createFilterBlock())
        mainContainer.append(this.createListBlock())
        template.append(mainContainer)
        return template;
    }

    private createFilterBlock() {
        let template = document.createElement("div")
        template.classList.add("filters")
        let title = document.createElement("h2")
        title.classList.add("filters__title")
        title.textContent = "Параметры"
        template.append(title)

        let filter = new Filter(this.filterParams, this.products)
        template.append(filter.drawFilter())

        return template
    }

    private createListBlock() {
        let template = document.createElement("div")
        template.textContent = "createListBlock"
        return template
    }


    private enableFilterProducts() {
        this.container.addEventListener("input", (e: Event) => {
            let target = e.target as HTMLInputElement;
            // let category = target.getAttribute("name");
            // let value = target.getAttribute("value");
            // if (target.checked) {
            //     // @ts-ignore
            //     defaultState.filterParams[category].push(value)
            // } else {
            //     // @ts-ignore
            //     defaultState.filterParams[category] = defaultState.filterParams[category].filter(n => n !== value)
            // }
            //
            // let newURL = generateURL(defaultState.filterParams)
            // window.location.hash = "products/" + newURL
            // window.history.pushState({}, "", "/#products" + newURL);
        })
    }

    render() {
        const title = this.createHeaderTitle("Products Page")
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