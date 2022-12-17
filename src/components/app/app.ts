import ProductsPage from "../../pages/products";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/error404";
import Header from "../view/header";
import Controller from "../controller/controller";

class App {
    private container: HTMLElement;
    private initialPage: ProductPage;
    private static defaultPageId = "current-page"
    private controller: Controller;

    constructor() {
        this.container = document.body;
        this.controller = new Controller()
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
            page = new ProductsPage("products-page");
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
            // check URL (params) => parse params => set params

            // render UI

            // PRODUCTS
                // render filter
                    //  add eventListener form => change URL => rerender products list

                // render products
                    //  addEventListener add/remove to cart
                    //  addEventListener open product



            let hash = window.location.hash.slice(1)
            this.container.append(Header)
            const pageHTML = this.initialPage.render()
            pageHTML.id = App.defaultPageId
            this.container.append(pageHTML)
            if (hash) {
                App.renderNewPage(hash)
            }

            // Обработчик роутров
            this.enableRouteChange()

        })


    }
}

export default App