import ProductsPage from "../../pages/products";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/Error404";
import header from "../view/header";

class App {
    private container: HTMLElement;
    private initialPage: ProductPage;
    private static defaultPageId = "current-page"

    constructor() {
        this.container = document.body;
        this.initialPage = new ProductPage("products-page")
    }

    static renderNewPage(idPage: string) {
        const currentPage = <HTMLDivElement>document.getElementById(App.defaultPageId)
        currentPage.innerHTML = ""
        let page: CartPage | ProductPage | ProductsPage | ErrorPage | null = null;

        if (idPage === "") {
            page = new ProductsPage("products-page");
        } else if (idPage === "cart") {
            page = new CartPage("cart-page");
        } else if (idPage === "products") {
            page = new ProductsPage("products-page");
        } else if (idPage.includes("products?")) {
            page = new ProductsPage("products-page", idPage);
        } else if (idPage.includes("product/")) {
            page = new ProductPage("product-page");
        } else {
            page = new ErrorPage("error-page");
        }

        if (page) {
            const pageHTML = page.render()
            currentPage.append(pageHTML)
        }
    }

    private enableRouteChange() {
        addEventListener("hashchange", () => {
            let hash = window.location.hash.slice(1)
            App.renderNewPage(hash)
        })

        window.onpopstate = () => {
            console.log(window.location.hash.slice(1))
        }
    }

    run() {
        addEventListener("DOMContentLoaded", () => {
            let hash = window.location.hash.slice(1)
            this.container.append(header)
            const pageHTML = this.initialPage.render()
            pageHTML.id = App.defaultPageId
            this.container.append(pageHTML)
            if (hash) {
                App.renderNewPage(hash)
            }
            this.enableRouteChange()
        })
    }
}

export default App