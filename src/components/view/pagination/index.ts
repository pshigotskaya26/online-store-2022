import "./index.scss"

class Pagination {
    currentPage: number
    rows: number
    rowsPerPageHTML: HTMLInputElement;
    elements: number
    pagesHTML: HTMLElement;
    handlerPage: () => void

    constructor(elements: number, handlerPage: () => void, rows: number, currentPage: number,) {
        this.rowsPerPageHTML = document.createElement("input")
        this.rows = rows
        this.pagesHTML = document.createElement("div")
        this.currentPage = currentPage
        this.elements = elements

        this.handlerPage = handlerPage
    }

    render() {
        let paginationWrapper = document.createElement("div")
        paginationWrapper.classList.add("pagination__wrapper")

        let settings = document.createElement("div")

        this.rowsPerPageHTML.classList.add("pagination__rows")
        this.rowsPerPageHTML.type = "number"
        this.rowsPerPageHTML.min = String(1)
        this.rowsPerPageHTML.max = String(10)
        this.rowsPerPageHTML.defaultValue = String(this.rows)

        settings.append(this.rowsPerPageHTML)


        paginationWrapper.append(settings)
        this.createPages(this.elements)
        paginationWrapper.append(this.pagesHTML)
        this.enableHandlers()
        return paginationWrapper
    }

    updatePages = () => {
        this.createPages(this.elements)
    }

    createPages = (elements: number): void => {
        this.pagesHTML.innerHTML = ""
        let pageNumbers = [];

        for (let i = 1; i <= Math.ceil(elements / this.rows); i++) {
            pageNumbers.push(i)
        }
        this.pagesHTML.classList.add("pagination")
        pageNumbers.forEach(el => {
            let paginationItem = document.createElement("div")
            paginationItem.classList.add("pagination__item")
            if (this.currentPage === +el) {
                paginationItem.classList.add("pagination__item-active")
            }
            paginationItem.textContent = String(el)
            this.pagesHTML.append(paginationItem)
        })

    }

    decrementCurrentPage() {
        this.currentPage = this.currentPage - 1
    }

    enableHandlers() {

        this.rowsPerPageHTML.addEventListener("input", this.handleElementsPerPage)

        this.pagesHTML.addEventListener("click", this.handleClickPage)

    }

    handleElementsPerPage = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            this.rows = +e.target.value
            this.updatePages()
            this.handlerPage()
        }
    }

    handleClickPage = (e: Event) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains("pagination__item")) {
            this.currentPage = e.target.textContent ? +e.target.textContent : 1
            this.updatePages()
            this.handlerPage()
        }
    }
}

export default Pagination