import Controller from "../controller/controller";
import Router from "../Router";
import {products} from "../../data/products";

class App {
    controller: Controller;

    constructor() {
        this.controller = new Controller();
        // this.view = new AppView();
    }

    init() {
        let router = new Router()
        router.init(this.controller)

        console.log("render current page")
        // document
        //     .querySelector('.sources')
        //     ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        // this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App