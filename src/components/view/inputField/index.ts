export function createInputFieldHTMLElement(
    title: string,
    typeInput: string,
    nameInput: string,
    id: string,
    value: string,

): HTMLElement {
    let wrapper = document.createElement("div")
    wrapper.classList.add("filter-item-wrapper")
    let titleEl = document.createElement("h3")
    titleEl.classList.add("search__title")
    titleEl.innerText = title
    wrapper.append(titleEl)
    let input = document.createElement("input")
    input.classList.add("search-input")
    input.type = typeInput
    input.name = nameInput
    input.value = value
    input.placeholder = "Введите значение"
    input.defaultValue = value

    wrapper.append(input)
    return wrapper
}