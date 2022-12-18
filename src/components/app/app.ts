import ProductsPage from "../../pages/products";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/error404";
import Header from "../view/header";
import Controller from "../controller/controller";
import AppView from "../view/appView";
import MainPage from "../../pages/main";
import {URLParams} from "../../types/URLParams";
import {getURLParams} from "../../utils/getURLParams";

class App {
    private container: HTMLElement;
    private initialPage: MainPage;
    private static defaultPageId = "current-page"
    private controller: Controller;
    private view: AppView;

    constructor() {
        this.container = document.body;
        this.controller = new Controller()
        this.view = new AppView();
        this.initialPage = new MainPage("main-page")
    }

    static renderNewPage({hashPage, idProduct, queryParams}: URLParams) {
        const currentPage = <HTMLDivElement>document.getElementById(App.defaultPageId)
        currentPage.innerHTML = ""
        let page: CartPage | ProductPage | ProductsPage | ErrorPage | null = null;
        if (hashPage === "") {
            page = new ErrorPage("error-page");
        } else if (hashPage === "cart") {
            page = new CartPage("cart-page");
        } else if (hashPage.includes("products")) {
            page = new ProductsPage("products-page");
        } else if (hashPage.includes("product/")) {
            page = new ProductPage("product-page", idProduct ? idProduct : "");
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
            let URLParams: URLParams = getURLParams(window.location.hash)
            App.renderNewPage(URLParams)
        })

        window.onpopstate = () => {
            console.log(window.location.hash.slice(1))
        }
    }

    private checkLocation() {


        const pageHTML = this.initialPage.render()
        pageHTML.id = App.defaultPageId

        this.container.append(pageHTML)

        let URLParams: URLParams = getURLParams(window.location.hash)

        if (URLParams.hashPage) {
            App.renderNewPage(URLParams)
        }
    }

    run() {
        addEventListener("DOMContentLoaded", () => {

            // checkLocalStorage
            this.container.append(Header)

            // check URL (params) => parse params => set params
            this.checkLocation()


            // render UI


            // PRODUCTS
            // render filter
            //  add eventListener form => change URL => rerender products list

            // render products
            //  addEventListener add/remove to cart
            //  addEventListener open product


            // let a = <HTMLButtonElement>document.getElementById("testtt")
            // a.addEventListener("click", () => {
            //
            //     console.log(newURL)
            // })
            // Обработчик роутров
            this.enableRouteChange()


        }, true)

    }
}

export default App