import "./index.scss"

export class Modal {
    root: HTMLDivElement;
    isVisibleModal: boolean

    constructor() {
        this.root = document.createElement("div")
        this.isVisibleModal = false
        this.root.classList.add("modal")
        this.root.classList.add("hidden")
        this.root.id = "modal"
    }

    showModal() {
        this.root.classList.remove("hidden")
    }

    hideModal() {
        this.root.classList.add("hidden")
    }

    handleModal() {
        this.isVisibleModal = !this.isVisibleModal
        this.isVisibleModal ? this.showModal() : this.hideModal()
    }

    _enableHandlerCloseModal() {
        let buttonClose = this.root.querySelector(".modal__button-close")
        buttonClose?.addEventListener("click", () => {
            this.handleModal()
        })

        let modalOverlay = this.root.querySelector(".modal__overlay")
        modalOverlay?.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('modal__overlay')) {
                this.handleModal()
            }
        })
    }

    render(title: string, children: HTMLElement) {
        this.root.innerHTML = `
        <div class="modal__overlay">
            <div class="modal__content">
                <div class="modal__title">
                    <h2 class="cart__title">${title}</h2>
                    <button class="modal__button-close">X</button>
                </div>
                <div class="modal__main"></div>
            </div>
        </div>
        `
        let mainContent: HTMLElement | null = this.root.querySelector(".modal__main")
        mainContent?.append(children)
        this._enableHandlerCloseModal()
        return this.root
    }
}