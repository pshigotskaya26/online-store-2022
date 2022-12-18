import PageContent from "./index.html"
import {Product} from "../../types/Product";
import defaultState from "../../components/state/state";
import {generateURL} from "../../utils/generateURL";
import Controller from "../../components/controller/controller";
import AppView from "../../components/view/appView";

class ProductsPage {
    controller: Controller;
    view: AppView;
    private container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement("div");
        this.container.id = id;
        this.controller = new Controller()
        this.view = new AppView()
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("template");
        template.innerHTML = PageContent;
        return template.content.firstChild as HTMLElement;
    }

    private enableFilterProducts() {
        this.container.addEventListener("input", (e: Event) => {
            let target = e.target as HTMLInputElement
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
        const title = this.createHeaderTitle("Products Page")
        const content = this.createContentPage()

        this.container.append(title)
        this.container.append(content)
        this.enableFilterProducts()

        return this.container
    }
}

export default ProductsPage;