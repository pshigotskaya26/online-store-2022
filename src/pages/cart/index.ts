class CartPage {
    private container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        return "1"
        // let headerTitle = document.createElement("h1");
        // headerTitle.innerHTML = text;
        // return headerTitle;
    }

    render() {
        const title = this.createHeaderTitle("Cart Page")
        this.container.append(title)
        const content = this.createContentPage()
        this.container.append(content)
        return this.container
    }
}

export default CartPage;