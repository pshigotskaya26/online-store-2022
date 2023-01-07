export class Button {
    root: HTMLButtonElement;
    name: string;

    constructor(name: string) {
        this.root = document.createElement("button")
        this.name = name
    }



    render() {
        this.root.textContent = this.name
        this.root.type = "button"
        this.root.value = this.name
        this.root.classList.add("button")

        return this.root
    }
}