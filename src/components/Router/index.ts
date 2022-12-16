import Controller from "../controller/controller";
import CartPage from "../../pages/cart.html"
import ProductsPage from "../../pages/products.html"
import ProductPage from "../../pages/product.html"
import ErrorPage from "../../pages/404.html"
import MainPage from "../../pages/index.html"

class Router {
    init(controller: Controller) {
        addEventListener("hashchange", () => this.handleHash(controller))
        this.handleHash(controller)
    }


    handleHash(controller: Controller) {
        const {name, params} = getRouteInfo()
        let rootEl = document.getElementById("main-page") as HTMLDivElement;

        if (name) {
            const routeName = name.toString()
            let id = params.id
            if (routeName === "cart") {
                rootEl.innerHTML = CartPage
            } else if (routeName.includes("products")) {
                if (routeName === "products" && !id) {
                    rootEl.innerHTML = ProductsPage
                } else if (routeName.includes("products?")) {
                    rootEl.innerHTML = ProductsPage
                } else if ((routeName === "products") && !!id) {
                    rootEl.innerHTML = ProductPage
                } else {
                    rootEl.innerHTML = ErrorPage
                }

            } else {
                rootEl.innerHTML = ErrorPage
            }
        } else {
            rootEl.innerHTML = MainPage
        }
    }
}

function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : "";
    const [name, id] = hash.split("/");
    return {name, params: {id}}
}

export default Router