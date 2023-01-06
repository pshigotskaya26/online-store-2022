import "./index.scss"

export class InputForm {
    root: HTMLElement;

    constructor(
        private label: string,
        private name: string,
        private id: string,
        private type: string,
        private placeholder: string,
        private errorText: string,
        private pattern: RegExp
    ) {
        this.root = document.createElement("div")
    }

    _enableHandler() {
        let input = this.root.querySelector("input")
        let textError = this.root.querySelector(".form__error-text")
        input?.addEventListener("blur", (e) => {
            if (e.target instanceof HTMLInputElement) {
                let res = this.pattern.test(e.target.value)
                if (!res) {
                    textError?.classList.remove("hidden")
                }
            }
        })
        input?.addEventListener("input", (e) => {
            if (e.target instanceof HTMLInputElement) {
                textError?.classList.add("hidden")
            }
        })
    }

    createFieldRedirect() {
        return document.createElement("div")
    }

    render() {
        this.root.classList.add("form__item")
        let label = document.createElement("label")
        label.classList.add("form__item-label")
        label.setAttribute("for", this.id)
        label.textContent = this.label

        let input = document.createElement("input")
        input.type = this.type
        input.classList.add("form-control")
        input.id = this.id
        input.required = true
        input.ariaLabel = this.errorText
        input.placeholder = this.placeholder
        input.pattern = this.pattern.toString().slice(1, this.pattern.toString().lastIndexOf("/"))
        let textError = document.createElement("p")
        textError.classList.add("form__error-text")
        textError.classList.add("hidden")
        textError.textContent = this.errorText

        this.root.append(label)
        this.root.append(input)
        this.root.append(textError)
        this._enableHandler()

        return this.root
    }

}