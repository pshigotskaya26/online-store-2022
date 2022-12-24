import ProductsPage from "../../pages/products";
import ProductPage from "../../pages/product";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/error404";
import Header from "../view/header";
import Footer from "../view/footer";
import Controller from "../controller/controller";
import AppView from "../view/appView";
import {URLParams} from "../../types/URLParams";
import {getURLParams} from "../../utils/getURLParams";
import {types} from "sass";
import Number = types.Number;
import {ProductInterface} from "../../types/Product";
import {productsData} from "../../data/products";

class App {
    private container: HTMLElement;
    private initialPage: ProductsPage;
    private static defaultPageId = "current-page"
    private controller: Controller;
    private view: AppView;

    constructor() {
        this.controller = new Controller()
        this.view = new AppView();
        this.container = document.body;
        this.initialPage = new ProductsPage("products-page", productsData)
    }

    private renderNewPage({hashPage, idProduct, queryParams}: URLParams) {
        const currentPage = <HTMLDivElement>document.getElementById(App.defaultPageId)
        currentPage.innerHTML = ""
        let page: CartPage | ProductPage | ProductsPage | ErrorPage | null = null;
        if (hashPage === "") {
            page = new ErrorPage("error-page");
        } else if (hashPage === "cart") {
            page = new CartPage("cart-page");
        } else if (hashPage.includes("products")) {
            page = new ProductsPage("products-page", productsData);
        } else if (hashPage.includes("product/")) {
            if (idProduct) {
                let product = this.controller.getProduct(idProduct)
                page = new ProductPage("product-page", product);
            } else {
                page = new ErrorPage("error-page");
            }

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
            console.log('URLParams: ', URLParams);
            this.renderNewPage(URLParams)
        })

        window.onpopstate = () => {
            console.log("aa")
            // let URLParams: URLParams = getURLParams(window.location.hash)
            // App.renderNewPage(URLParams)
        }
    }

    private checkLocation() {
        const pageHTML = this.initialPage.render()
        pageHTML.id = App.defaultPageId

        this.container.append(pageHTML)

        let URLParams: URLParams = getURLParams(window.location.hash)
		console.log('URLParams in checkLocation: ', URLParams);
        this
        if (URLParams.hashPage) {
            this.renderNewPage(URLParams)
        }
    }

    run() {
        addEventListener("DOMContentLoaded", () => {
			//console.log('Header: ', Header);

            // checkLocalStorage
            this.container.append(Header)

            // check URL (params) => parse params => set params
            this.checkLocation()

            this.container.append(Footer)
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