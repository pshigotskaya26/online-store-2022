import "./style.scss"

class ErrorPage {
    private container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement("div");
        this.container.id = id
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        const container = document.createElement("div")
        container.classList.add("container")
        let error404wrapper = document.createElement("div")
        error404wrapper.classList.add("error_wrapper")

        let text = document.createElement("h3")
        text.classList.add("errortext")
        text.textContent = "Error 404"
        error404wrapper.append(text)




        container.append(error404wrapper)
        return container
        // let headerTitle = document.createElement("h1");
        // headerTitle.innerHTML = text;
        // return headerTitle;
    }

    render() {
        const title = this.createHeaderTitle("Error Page")
        this.container.append(title)
        const content = this.createContentPage()
        this.container.append(content)
        return this.container
    }
}

export default ErrorPage;