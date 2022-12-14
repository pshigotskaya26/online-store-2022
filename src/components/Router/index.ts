import Controller from "../controller/controller";

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
                rootEl.innerHTML = "<h2>cart</h2>"
            } else if (routeName.includes("products")) {
                if (routeName === "products" && !id) {
                    rootEl.innerHTML = "<h2>all products</h2>"
                } else if (routeName.includes("products?")) {
                    rootEl.innerHTML = "<h2>products with filter</h2>"
                } else if ((routeName === "products") && !!id) {
                    rootEl.innerHTML = `<h2>product id ${id}</h2>`
                } else {
                    rootEl.innerHTML = `<h2>404</h2>`
                }

            } else {
                rootEl.innerHTML = `<h2>404</h2>`
            }
        } else {
            rootEl.innerHTML = `<h2>main page</h2>`
        }
    }
}

function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : "";
    const [name, id] = hash.split("/");
    return {name, params: {id}}
}

export default Router