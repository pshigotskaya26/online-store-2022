import CartLayout from "./index.html"
import "./style.scss"

class CartPage {
    private container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement("main");
        this.container.classList.add("main");
        this.container.id = id;
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("main__container");
        mainContainer.innerHTML = CartLayout;
        let modalWindow: HTMLElement | null = mainContainer.querySelector("#modal");

        modalWindow?.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('modal__button-close')) {
                modalWindow?.classList.remove("hidden");
            }
        })

        template.append(mainContainer);
        return template;
    }

    render() {
        const title = this.createHeaderTitle("Cart Page");
        const content = this.createContentPage();
        const container = document.createElement("div");
        container.classList.add("container");
        container.append(title);
        container.append(content);
        this.container.append(container);
        return this.container;
    }
}

export default CartPage;