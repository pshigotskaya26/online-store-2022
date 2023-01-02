export class InputField {
    constructor(
        readonly title: string,
        readonly typeInput: string,
        readonly nameInput: string,
        readonly id: string,
        readonly value: string,
    ) {
        this.title = title;
        this.typeInput = typeInput;
        this.nameInput = nameInput;
        this.id = id;
        this.value = value;
    }

    render() {
        let wrapper = document.createElement("div")
        wrapper.classList.add("filter-item-wrapper")
        let titleEl = document.createElement("h3")
        titleEl.classList.add("search__title")
        titleEl.innerText = this.title
        wrapper.append(titleEl)
        let input = document.createElement("input")
        input.classList.add("search-input")
        input.type = this.typeInput
        input.name = this.nameInput
        input.value = this.value
        input.defaultValue = this.value
        wrapper.append(input)
        return wrapper
    }
}

export default InputField;