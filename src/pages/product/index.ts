class ProductPage {
    private container: HTMLElement;
    idElem?: string

    constructor(idTag: string, idElem: string) {
        this.container = document.createElement("div");
        this.container.id = idTag
        this.idElem = idElem
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        return `${this.idElem ?? this.idElem}`
    }

    render() {
        const title = this.createHeaderTitle("Product Page")
        this.container.append(title)
        const content = this.createContentPage()
        this.container.append(content)
        return this.container
    }
}

export default ProductPage;